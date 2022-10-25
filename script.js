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
    console.log(imgsArrCopy);
    const imgs = await Promise.all(imgsArrCopy);
    console.log(typeof imgs);
    imgs.forEach((img) => img.classList.add("parallel"));
    console.log(imgs);
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
    const imgs = await Promise.all(imgsArr.map((img) => imgFunction(img)));
    imgs.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error("Masz lipe");
  }
};
// mapAsync([picsum1, picsum2, picsum3], createImg);

/////////////////////////// wersja z klasą /////////////////////////////

class ImgsArrCl {
  constructor(imgsArr) {
    this.imgsArr = imgsArr;
  }

  mapAsync = async function (imgFunction) {
    try {
      const imgs = await Promise.all(
        this.imgsArr.map((img) => imgFunction(img))
      );
      imgs.forEach((img) => img.classList.add("parallel"));
    } catch (err) {
      console.error("Masz lipe");
    }
  };
}

const images = new ImgsArrCl([picsum1, picsum2, picsum3]);

images.mapAsync(createImg);
