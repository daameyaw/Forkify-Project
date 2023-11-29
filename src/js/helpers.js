import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const fetchPro
    const respond = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

    const data = await respond.json();

    if (!respond.ok) throw new Error(`${data.message} (${respond.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
