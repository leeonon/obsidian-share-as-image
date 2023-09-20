/*
 * @Description: Tool functions related to image operations
 */

import { Notice } from 'obsidian';
import { toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';
import fs from 'fs';

/**
 * Converts remote network images to base64
 *
 * @async
 * @param {string} url - img link: http|https
 * @returns {Promise<string>}
 */
export async function remoteImageToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const base64Data = canvas.toDataURL('image/png');
      resolve(base64Data);
    };

    img.onerror = function (error) {
      new Notice('Image loading failed');
      reject(error);
    };
    img.src = url;
  });
}

/**
 * Convert local image to base64
 * example: app://d828f9c0d81695d05139dc0f52c1346cda64/1691305579070.png?1691592890182
 *
 * @async
 * @param {string} url - local url
 * @returns {Promise<string>}
 */
export async function localImageToBase64(url: string): Promise<string> {
  // const fullLink = this.app.vault.adapter.getFilePath(url).toString();
  // const filePath = fullLink.replace('file://', '');
  const filePath = url.replace(/app:\/\/[^/]+(\/)/, '$1');
  const imageBuffer = fs.readFileSync(filePath.split('?')[0]);

  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return base64Image;
}

export async function imageToBase64(url: string): Promise<string> {
  const pattern = /^https?:\/\//;
  return pattern.test(url) ? await remoteImageToBase64(url) : await localImageToBase64(url);
}

export function blobToBuffer(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Download the image representation of a given HTML element.
 * Opens a save dialog for the user to choose where to save the image.
 *
 * @async
 * @param {HTMLElement} target - The HTML element to capture as an image.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if the operation fails.
 */
export async function downloadImage(target: HTMLElement) {
  // @ts-ignore
  const result = await window.electron.remote.dialog.showSaveDialog(this.electronWindow, {
    title: 'Export Image',
    defaultPath: `obsidian-share-image-${Date.now()}.png`,
    filters: [{ name: '', extensions: ['png'] }],
  });
  if (result.canceled) return;

  const path = result.filePath;
  const blob = await toBlob(target, {
    canvasHeight: target.clientHeight,
    canvasWidth: target.clientWidth,
    pixelRatio: 2,
  });
  if (blob) {
    const buffer = await blobToBuffer(blob);
    try {
      // @ts-ignore
      await fs.writeFileSync(path, buffer);
      // @ts-ignore
      await window.electron.remote.shell.showItemInFolder(path);
      new Notice('Export Image Success', 3000);

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (error) {
      new Notice('Export Image Failed', 3000);
    }
  }
}

/**
 * Copy the image representation of a given HTML element to clipboard.
 *
 * @async
 * @param {HTMLElement} target - The HTML element to capture as an image.
 * @returns {Promise<void>}
 */
export async function handlerCopyImage(target: HTMLElement) {
  const blob = await toBlob(target, {
    canvasHeight: target.clientHeight,
    canvasWidth: target.clientWidth,
    pixelRatio: 2,
  });
  if (blob) {
    new Notice('Copy As Image Success');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    window.navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  }
}

// export function getLocalImgSrc(url: string) {
// const activeFile = this.app.workspace.getActiveFile();
// let activePath = this.app.vault.getResourcePath(activeFile);
// activePath = activePath.substring(0, activePath.lastIndexOf('/'));
// let cleanLink = url.replace(/app:\/\/[^/]+\//, '');
// cleanLink = url.replace('app://obsidian.md/', '');
// // For iOS
// cleanLink = cleanLink.replace('capacitor://localhost/', '');
// const fullLink = activePath + '/' + cleanLink;
// if (Platform.isMobile) {
//   // console.log("Running on mobile platform - setting object fit and height of img")
//   // link.style.objectFit = "contain"
//   // link.height = 100
// }
// return fullLink;
// }
