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
///////////////////////////// CHALLENGE 3 ///////////////////////////////
/////////////////////////// Array.prototype /////////////////////////////

// Array.prototype.mapAsync = async function (imgsArr, imgFunction){
//   try {

//   } catch (err) {
//     console.error('Masz lipe');
//   }
// }

const mapAsync = async function (imgsArr, imgFunction) {
  try {
    const imgsArrCopy = imgsArr.map((img) => imgFunction(img));
    return await Promise.all(imgsArrCopy);
  } catch (err) {
    console.error(`Masz lipe (${err})`);
  }
};

const sorryButICanOnlyUseAwaitInsideAsyncFunction = async function () {
  const imgs = await mapAsync([picsum1, picsum2, picsum3], createImg);
  return imgs.forEach((img) => img.classList.add("parallel"));
};

sorryButICanOnlyUseAwaitInsideAsyncFunction();
