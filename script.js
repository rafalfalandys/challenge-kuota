"use strict";

const imageContainer = document.querySelector(".images");

const picsum1 = "https://picsum.photos/600/900";
const picsum2 = "https://picsum.photos/900/1350";
const picsum3 = "https://picsum.photos/1200/1800";

/////////////////////////////////////////////////////////////////////////
/////////////////// CHALLENGE 1 - ten z for eachem //////////////////////
/////////////////////////////////////////////////////////////////////////

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
    const imgs = await Promise.all(imgsArrCopy);
    console.log(imgs);
    imgs.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.log("Masz lipę ze wszystkimi obrazkami");
  }
};

// loadAllImgs([picsum1, picsum2, picsum3]);

/////////////////////////////////////////////////////////////////////////
///////////////////////////// CHALLENGE 2 ///////////////////////////////
////////////////////////// funkcja w funkcji ////////////////////////////

const mapAsync = async function (imgsArr, imgFunction) {
  try {
    // const imgsArrCopy = imgsArr.map((img) => imgFunction(img));
    // console.log(imgsArrCopy);
    const imgsArrCopy = imgsArr.map((img) => imgFunction(img));
    const imgsArrCopy2 = await Promise.all(imgsArrCopy);
    console.log(imgsArrCopy2);
    return imgsArrCopy2;
  } catch (err) {
    console.error(`Masz lipe (${err})`);
  }
};

const sorryButICanOnlyUseAwaitInsideAsyncFunction = async function () {
  const imgs = await mapAsync([picsum1, picsum2, picsum3], createImg);
  return imgs.forEach((img) => img.classList.add("parallel"));
};

sorryButICanOnlyUseAwaitInsideAsyncFunction();
