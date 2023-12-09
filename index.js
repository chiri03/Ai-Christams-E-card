import { HfInference } from "@huggingface/inference";

const dialogModal = document.getElementById("dialog-modal");
const imageContainer = document.getElementById("image-container");
const userInput = document.getElementById("user-input");

dialogModal.show();

const Api = "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";

dialogModal.addEventListener("submit", async (event) => {
  event.preventDefault();
  dialogModal.firstElementChild.firstElementChild.textContent = "Loading...";
  const inference = new HfInference(Api);
  const imageInferenceResult = await inference.textToImage({
    model: "SimianLuo/LCM_Dreamshaper_v7",
    inputs: `${userInput.value}`,
  });
  const resultUrl = await convertImage(imageInferenceResult);
  imageContainer.innerHTML = `<img src="${resultUrl}" alt="AI image generated" >`;
  dialogModal.close();
});

async function convertImage(imageInferenceResult) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(imageInferenceResult);
  });
}
