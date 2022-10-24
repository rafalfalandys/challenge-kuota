"use strict";

const imageContainer = document.querySelector(".images");

const createImg = async function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    img.addEventListener("load", function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error(`Masz lipę z pojedynczym obrazkiem (${imgPath})`));
    });
  });
};

const loadAllImgs = async function (imgsArr) {
  try {
    let imgsArrCopy = [];
    imgsArr.forEach((img) => imgsArrCopy.push(createImg(img)));
    console.log(imgsArrCopy);
    const imgs = await Promise.all(imgsArrCopy);
    console.log(typeof imgs);
    imgs.forEach((img) => img.classList.add("parallel"));
    console.log(imgs);
  } catch (err) {
    console.log("Masz lipę ze wszystkimi obrazkami");
  }
};

const picsum1 = "https://picsum.photos/600/900";
const picsum2 = "https://picsum.photos/900/1350";
const picsum3 = "https://picsum.photos/1200/1800";
loadAllImgs([picsum1, picsum2, picsum3]);
