// (function (window, document) {
//   "use strict";
//   function myPlugin(element, options) {
let historyStack = ["C:\\\\root"];

let currentPage = 0;
const itemsPerPage = 5;

function updateURLParameter(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url);
}

function getURLParameter(key) {
  const url = new URL(window.location);
  return url.searchParams.get(key);
}
async function displayFolderStructure(parentFolderPath = "", currentPage = 1) {
  const response = await fetch(
    `/get-folder-structure?parentFolderPath=${parentFolderPath}`
  );
  const folderStructure = await response.json();

  console.log("folderStructure", folderStructure);

  // const se = document.getElementById("sortCriteria");
  // se.addEventListener("change", () => {
  //   const selectedValue = sortCriteria.value;

  //   if (selectedValue === "date") {
  //     console.log(selectedValue);
  //     const reversedStructure = Object.fromEntries(
  //       Object.entries(folderStructure).map(([key, value]) => [
  //         key,
  //         value.reverse(),
  //       ])
  //     );
  //     const folderStructureDiv = document.getElementById("folderStructure");

  //     folderStructureDiv.innerHTML = "";

  //     console.log(reversedStructure);
  //     if (historyStack.length > 1) {
  //       const backButton = document.createElement("div");
  //       backButton.classList.add("back");

  //       backButton.textContent = "Back";
  //       backButton.addEventListener("click", () => {
  //         historyStack.pop();
  //         const previousPath = historyStack[historyStack.length - 1];
  //         updateURLParameter("currentFolder", previousPath);
  //         displayFolderStructure(previousPath);
  //       });
  //       folderStructureDiv.appendChild(backButton);
  //     }

  //     const startIdx = (currentPage - 1) * itemsPerPage;
  //     const endIdx = currentPage * itemsPerPage;

  //     // Display folder structure based on the reversed order
  //     reversedStructure.folders.slice(startIdx, endIdx).forEach((folder) => {
  //       const folderElement = createFolderElement(
  //         folder.replace(/\\/g, "\\\\"),
  //         parentFolderPath
  //       );
  //       folderStructureDiv.appendChild(folderElement);
  //     });

  //     if (reversedStructure.files.length > 0) {
  //       const filesHeading = document.createElement("h2");
  //       filesHeading.textContent = "Files";
  //       folderStructureDiv.appendChild(filesHeading).style.marginBottom =
  //         "20px";

  //       reversedStructure.files.slice(startIdx, endIdx).forEach((file) => {
  //         const fileElement = createFileElement(
  //           file.replace(/\\/g, "\\\\"),
  //           parentFolderPath
  //         );
  //         folderStructureDiv.appendChild(fileElement);
  //       });
  //     }

  //     // Display images and videos as per the reversed order
  //     // Add similar logic for images and videos if needed

  //     if (parentFolderPath) {
  //       const heading = document.createElement("h2");
  //       heading.textContent = `${parentFolderPath.replace(/\\/g, "\\\\")}`;
  //       folderStructureDiv.insertBefore(heading, folderStructureDiv.firstChild);
  //     }

  //     addPaginationControls(
  //       reversedStructure,
  //       currentPage,
  //       itemsPerPage,
  //       parentFolderPath
  //     );
  //   } else if (selectedValue === "type") {
  //     const folderStructureDiv = document.getElementById("folderStructure");

  //     folderStructureDiv.innerHTML = "";

  //     if (historyStack.length > 1) {
  //       const backButton = document.createElement("div");
  //       backButton.classList.add("back");

  //       backButton.textContent = "Back";
  //       backButton.addEventListener("click", () => {
  //         historyStack.pop();
  //         const previousPath = historyStack[historyStack.length - 1];
  //         updateURLParameter("currentFolder", previousPath);
  //         displayFolderStructure(previousPath);
  //       });
  //       folderStructureDiv.appendChild(backButton);
  //     }

  //     const startIdx = (currentPage - 1) * itemsPerPage;
  //     const endIdx = currentPage * itemsPerPage;

  //     folderStructure.folders.slice(startIdx, endIdx).forEach((folder) => {
  //       const folderElement = createFolderElement(
  //         folder.replace(/\\/g, "\\\\"),
  //         parentFolderPath
  //       );
  //       folderStructureDiv.appendChild(folderElement);
  //     });

  //     if (folderStructure.files.length > 0) {
  //       const filesHeading = document.createElement("h2");
  //       filesHeading.textContent = "Files";
  //       folderStructureDiv.appendChild(filesHeading).style.marginBottom =
  //         "20px";

  //       folderStructure.files.slice(startIdx, endIdx).forEach((file) => {
  //         const fileElement = createFileElement(
  //           file.replace(/\\/g, "\\\\"),
  //           parentFolderPath
  //         );
  //         folderStructureDiv.appendChild(fileElement);
  //       });
  //     }

  //     if (folderStructure.images.length > 0) {
  //       const imagesHeading = document.createElement("h1");
  //       imagesHeading.textContent = "Images";
  //       folderStructureDiv.appendChild(imagesHeading);

  //       folderStructure.images.slice(startIdx, endIdx).forEach((imageName) => {
  //         const imageUrl = `/get-file?filePath=${parentFolderPath.replace(
  //           /\\/g,
  //           "\\\\"
  //         )}\\${imageName}`;
  //         const imageContainer = createImageContainer(imageUrl, imageName);
  //         folderStructureDiv.appendChild(imageContainer);
  //       });
  //     }

  //     if (folderStructure.videos.length > 0) {
  //       const videosHeading = document.createElement("h1");
  //       videosHeading.textContent = "Videos";
  //       folderStructureDiv.appendChild(videosHeading);

  //       folderStructure.videos.slice(startIdx, endIdx).forEach((videoName) => {
  //         const videoUrl = `/get-file?filePath=${parentFolderPath.replace(
  //           /\\/g,
  //           "\\\\"
  //         )}\\${videoName}`;
  //         const videoContainer = createVideoContainer(videoUrl, videoName);
  //         folderStructureDiv.appendChild(videoContainer);
  //       });
  //     }

  //     if (parentFolderPath) {
  //       const heading = document.createElement("h2");
  //       heading.textContent = `${parentFolderPath.replace(/\\/g, "\\\\")}`;
  //       folderStructureDiv.insertBefore(heading, folderStructureDiv.firstChild);
  //     }

  //     addPaginationControls(
  //       folderStructure,
  //       currentPage,
  //       itemsPerPage,
  //       parentFolderPath
  //     );
  //   }
  // });

  const folderStructureDiv = document.getElementById("folderStructure");

  folderStructureDiv.innerHTML = "";

  if (historyStack.length > 1) {
    const backButton = document.createElement("div");
    backButton.classList.add("back");

    backButton.textContent = "Back";
    backButton.addEventListener("click", () => {
      historyStack.pop();
      const previousPath = historyStack[historyStack.length - 1];
      updateURLParameter("currentFolder", previousPath);
      displayFolderStructure(previousPath);
    });
    folderStructureDiv.appendChild(backButton);
  }

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;

  folderStructure.folders.slice(startIdx, endIdx).forEach((folder) => {
    const folderElement = createFolderElement(
      folder.replace(/\\/g, "\\\\"),
      parentFolderPath
    );
    folderStructureDiv.appendChild(folderElement);
  });

  if (folderStructure.files.length > 0) {
    const filesHeading = document.createElement("h2");
    filesHeading.textContent = "Files";
    folderStructureDiv.appendChild(filesHeading).style.marginBottom = "20px";

    folderStructure.files.slice(startIdx, endIdx).forEach((file) => {
      const fileElement = createFileElement(
        file.replace(/\\/g, "\\\\"),
        parentFolderPath
      );
      folderStructureDiv.appendChild(fileElement);
    });
  }

  if (folderStructure.images.length > 0) {
    const imagesHeading = document.createElement("h1");
    imagesHeading.textContent = "Images";
    folderStructureDiv.appendChild(imagesHeading);

    folderStructure.images.slice(startIdx, endIdx).forEach((imageName) => {
      const imageUrl = `/get-file?filePath=${parentFolderPath.replace(
        /\\/g,
        "\\\\"
      )}\\${imageName}`;
      const imageContainer = createImageContainer(imageUrl, imageName);
      folderStructureDiv.appendChild(imageContainer);
    });
  }

  if (folderStructure.videos.length > 0) {
    const videosHeading = document.createElement("h1");
    videosHeading.textContent = "Videos";
    folderStructureDiv.appendChild(videosHeading);

    folderStructure.videos.slice(startIdx, endIdx).forEach((videoName) => {
      const videoUrl = `/get-file?filePath=${parentFolderPath.replace(
        /\\/g,
        "\\\\"
      )}\\${videoName}`;
      const videoContainer = createVideoContainer(videoUrl, videoName);
      folderStructureDiv.appendChild(videoContainer);
    });
  }

  if (parentFolderPath) {
    const heading = document.createElement("h2");
    heading.textContent = `${parentFolderPath.replace(/\\/g, "\\\\")}`;
    folderStructureDiv.insertBefore(heading, folderStructureDiv.firstChild);
  }

  addPaginationControls(
    folderStructure,
    currentPage,
    itemsPerPage,
    parentFolderPath
  );
}

function addPaginationControls(
  folderStructure,
  currentPage,
  itemsPerPage,
  parentFolderPath
) {
  const totalPages = Math.ceil(
    Math.max(
      folderStructure.folders.length,
      folderStructure.files.length,
      folderStructure.images.length,
      folderStructure.videos.length
    ) / itemsPerPage
  );

  const paginationDiv = document.getElementById("paginationControls");
  paginationDiv.innerHTML = "";

  if (totalPages > 1) {
    if (currentPage > 1) {
      const prevButton = document.createElement("div");
      prevButton.classList.add("butnn1");
      prevButton.textContent = "Previous";
      prevButton.addEventListener("click", () => {
        displayFolderStructure(parentFolderPath, currentPage - 1);
      });
      paginationDiv.appendChild(prevButton);
    }
    const HasNextPage = currentPage < totalPages;
    if (HasNextPage) {
      const nextPageButton = document.createElement("div");
      nextPageButton.classList.add("butnn2");
      nextPageButton.textContent = "Next";
      nextPageButton.addEventListener("click", () => {
        displayFolderStructure(parentFolderPath, currentPage + 1);
      });
      paginationDiv.appendChild(nextPageButton);
    }
  }
}

function createFolderElement(folder, parentFolderPath) {
  const folderElement = document.createElement("div");
  folderElement.classList.add("folder");

  folderElement.addEventListener("click", async (event) => {
    event.stopPropagation();

    const targetElement = event.target;

    if (
      targetElement === folderElement ||
      targetElement.tagName === "IMG" ||
      targetElement === folderName
    ) {
      const spanElement = folderElement.querySelector("span");
      if (spanElement) {
        const folderpathdata = document.querySelector("#folderStructure h2");
        console.log(folderpathdata);
        const selectedFolder = spanElement.innerHTML;
        rename.addEventListener("click", (e) => {
          const selectedFolder = spanElement.innerHTML;
          const folderPath = folderpathdata.textContent;
          const newFolderName = window.prompt(
            `Enter new name for folder "${folderPath}\\${selectedFolder}":`,
            selectedFolder
          );

          if (newFolderName !== null) {
            fetch("/change-folder-name", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                selectedFolder,
                folderPath,
                newFolderName,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setTimeout(() => {
                  toastr.success(data.message);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }, 1000);
              })

              .catch((error) => {
                toast.error(error.message);
              });
          }
        });
      }
    }

    const response = await fetch(
      `/get-folder-structure?parentFolderPath=${parentFolderPath}`
    );
    const folderStructure = await response.json();

    const clickedFolderIndex = folderStructure.folders.findIndex(
      (folder) => folder === folderElement.querySelector("span").textContent
    );
    folderElement.style.backgroundColor = "lightblue";

    async function deleteFolder(folderPath, folderElement) {
      try {
        const response = await fetch(
          `/delete-folder/${encodeURIComponent(folderPath)}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log(`Folder deleted successfully: ${folderPath}`);
          folderElement.remove();
          window.location.reload();
        } else {
          console.error("Failed to delete the folder");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const folderDeleted = document.getElementById("deleteButton");

    folderDeleted.addEventListener("click", async (event) => {
      event.stopPropagation();

      const response = await fetch(
        `/get-folder-structure?parentFolderPath=${encodeURIComponent(
          parentFolderPath
        )}`
      );
      const folderStructure = await response.json();

      const clickedFolderIndex = folderStructure.folders.findIndex(
        (folder) => folder === folderElement.querySelector("span").textContent
      );
      if (clickedFolderIndex !== -1) {
        const h2Text = document.querySelector(
          "#folderStructure h2"
        ).textContent;
        const folderPath = `${h2Text}\\${folderStructure.folders[clickedFolderIndex]}`;

        await deleteFolder(folderPath, folderElement);
        console.log(folderPath);
      }
    });
  });

  const folderIcon = document.createElement("img");

  folderIcon.src = "/folder.png";
  folderIcon.alt = "Folder Icon";
  folderIcon.classList.add("folder-icon");

  const folderName = document.createElement("span");

  folderName.textContent = folder;
  folderElement.appendChild(folderIcon);
  folderElement.appendChild(folderName);

  folderElement.addEventListener("dblclick", () => {
    const newPath = parentFolderPath
      ? `${parentFolderPath}\\${folder}`
      : `C:\\root\\${folder}`;
    historyStack.push(newPath);
    updateURLParameter("currentFolder", newPath);
    document.getElementById("parentFolderContainer").style.display = "block";
    document.getElementById("parentFolderPath").value = newPath;
    displayFolderStructure(newPath);
  });
  return folderElement;
}

function createFileElement(file, parentFolderPath) {
  const fileElement = document.createElement("div");
  fileElement.style.cursor = "pointer";
  fileElement.classList.add("file");

  const fileicon = document.createElement("img");
  fileicon.src = "/document.svg";
  fileicon.alt = "file_icon";
  fileicon.classList.add("file-icon");
  const filename = document.createElement("span");

  filename.textContent = file;
  fileElement.addEventListener("click", () => {
    let filedata = `${parentFolderPath}/${file}`.replace(/\\/g, "/");
    fileElement.style.backgroundColor = "lightblue";
    console.log(filedata);

    rename.addEventListener("click", (e) => {
      const newFileName = window.prompt(
        `enter the enw file name of this path" ${filedata}":`,
        file
      );

      if (newFileName !== null) {
        fetch("/change-file-name", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filedata,

            newFileName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setTimeout(() => {
              toastr.success(data.message);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }, 1000);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });

    const downloadFiles = document.getElementById("Download");

    downloadFiles.addEventListener("click", async () => {
      const filepath = filedata;
      try {
        const res = await fetch(
          `/get-files-base64?filePath=${encodeURIComponent(filepath)}`
        );
        if (!res.status === 200) {
          throw new Error("failed to featch the file");
        }
        const { base64 } = await res.json();
        const link = document.getElementById("downloadLink");
        link.href = `data:application/octet-stream;base64,${base64}`;
        toastr.success("downlaoding...");

        const fileName = filepath.split("/").pop();
        link.download = fileName;
        link.click();
      } catch (error) {
        console.error("error come in downlaoding ", error);
      }
    });

    async function deleteFile(filedata, fileElement) {
      try {
        const url = new URL(`/remove-file`, window.location.origin);
        url.searchParams.append("fileName", encodeURIComponent(filedata));
        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          console.log(`File deleted successfully: ${filedata}`);
          fileElement.remove();
          window.location.reload();
        } else {
          console.log("Failed to delete the file");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    let deleteButton = document.getElementById("deleteButton");

    deleteButton.addEventListener("click", () => {
      deleteFile(filedata, fileElement);
    });
  });

  // fileElement.textContent = file;
  fileElement.appendChild(fileicon);
  fileElement.appendChild(filename);
  fileElement.addEventListener("dblclick", () => {
    window.open(`/get-file?filePath=${parentFolderPath}\\${file}`, "_blank");
  });
  return fileElement;
}

function createImageContainer(imageUrl, imageName) {
  const imageElement = document.createElement("img");
  imageElement.style.cursor = "pointer";
  imageElement.src = imageUrl;
  imageElement.classList.add("image");

  const imageNameElement = document.createElement("div");
  imageNameElement.classList.add("image-name");
  imageNameElement.textContent = imageName;
  imageElement.addEventListener("dblclick", () => {
    window.open(imageUrl, "_blank");
  });

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  imageContainer.appendChild(imageElement);
  imageContainer.appendChild(imageNameElement);

  return imageContainer;
}

function createVideoContainer(videoUrl, videoName) {
  const videoElement = document.createElement("video");
  videoElement.style.cursor = "pointer";
  videoElement.src = videoUrl;
  videoElement.controls = true;
  videoElement.classList.add("video");

  const videoNameElement = document.createElement("div");
  videoNameElement.classList.add("video-name");
  videoNameElement.textContent = videoName;

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");
  videoContainer.appendChild(videoElement);
  videoContainer.appendChild(videoNameElement);

  return videoContainer;
}

document
  .getElementById("folderForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const folderName = document.getElementById("folderName").value;
    const parentFolderPath = document.getElementById("parentFolderPath").value;

    const response = await fetch("/create-folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, parentFolderPath }),
    });

    const result = await response.json();
    const resultDiv = document.getElementById("result");

    if (response.ok) {
      resultDiv.innerHTML = `<p>${result.message}</p>`;
      document.getElementById("folderName").value = "";
      displayFolderStructure(parentFolderPath || "C:\\root");
    } else {
      resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
    }
  });

document
  .getElementById("fileUploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileUpload = document.getElementById("fileUpload").files[0];
    const parentFolderPath = document.getElementById("parentFolderPath").value;

    const formData = new FormData();
    formData.append("fileUpload", fileUpload);

    const response = await fetch(
      `/upload-file?parentFolderPath=${parentFolderPath}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    const resultDiv = document.getElementById("result");

    if (response.ok) {
      resultDiv.innerHTML = `<p>${result.message}</p>`;
      document.getElementById("fileUpload").value = "";
      displayFolderStructure(parentFolderPath);
      window.location.reload();
    } else {
      resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
    }
  });

document
  .getElementById("createFileForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileName = document.getElementById("fileName").value;
    const parentFolderPath = document.getElementById("parentFolderPath").value;

    const response = await fetch(
      `/create-file?parentFolderPath=${parentFolderPath}&fileName=${fileName}.txt`,
      {
        method: "POST",
      }
    );

    const result = await response.json();
    const resultDiv = document.getElementById("result");

    if (response.ok) {
      resultDiv.innerHTML = `<p>${result.message}</p>`;
      document.getElementById("fileName").value = "";
      displayFolderStructure(parentFolderPath);
    } else {
      resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
    }
  });

window.onload = () => {
  const currentFolder = getURLParameter("currentFolder") || "C:\\root";
  historyStack = [currentFolder];
  displayFolderStructure(currentFolder);
};

const rename = document.querySelector("#rename");

const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("resultsofsearch");

searchInput.addEventListener("input", async (e) => {
  const searchData = e.target.value.trim();
  resultsContainer.innerHTML = "";

  if (searchData.length === 0) {
    window.location.reload();
    return;
  }

  console.log(`Searching for folder name: ${searchData}`);

  try {
    const url = new URL("/list-files-and-folder", window.location.origin);
    const res = await fetch(`${url}?letters=${searchData}`);

    if (res.ok) {
      const { filesAndFolders } = await res.json();
      console.log("Search results:", filesAndFolders);
      if (filesAndFolders.length === 0) {
        displayError("No results found.");
      } else {
        console.log("Search results:");
        filesAndFolders.forEach((item) => {
          document.getElementById("folderStructure").style.display = "none";
          // console.log(item.path);
          displayResult(item);
        });
      }
    } else {
      console.error("Failed to fetch search results.");
    }
  } catch (error) {
    console.error("Error occurred while searching:", error);
    displayError("Error occurred while searching.");
  }
});

function displayError(message) {
  const errorMessageSpan = document.createElement("span");
  errorMessageSpan.textContent = message;
  resultsContainer.appendChild(errorMessageSpan);
}

function displayResult(item) {
  const li = document.createElement("span");
  li.textContent = item.name;
  li.classList.add("result-item");

  li.style.cursor = "pointer";
  console.log(li.innerText);

  li.addEventListener("dblclick", (e) => {
    console.log(e.target.innerText);

    openFolder(item.path);
  });

  if (
    li.innerText.endsWith(".png") ||
    li.innerText.endsWith(".mp4") ||
    li.innerText.endsWith(".txt")
  ) {
    const fileIcon = document.createElement("img");
    fileIcon.src = "document.svg";
    fileIcon.alt = "folder-icon";
    resultsContainer.appendChild(li);
    resultsContainer.appendChild(fileIcon);
  } else {
    const folderIcon = document.createElement("img");
    folderIcon.src = "folder.png";
    folderIcon.alt = "folder-icon";

    resultsContainer.appendChild(li);
    resultsContainer.appendChild(folderIcon);
  }
  // li.addEventListener("mouseenter", (e) => {
  //   console.log(e.target.innerText);
  // });
}

async function openFolder(folderPath) {
  try {
    const url = new URL("/open-folder", window.location.origin);
    url.searchParams.append("folderName", folderPath);

    const res = await fetch(url);
    const newPath = folderPath ? `${folderPath}` : `${folderPath}`;
    historyStack.push(newPath);
    updateURLParameter("currentFolder", newPath);
    document.getElementById("parentFolderContainer").style.display = "none";
    document.getElementById("parentFolderPath").value = newPath;

    if (res.ok) {
      const folderContents = await res.json();

      console.log(`Opened folder: ${folderPath}`);

      document
        .getElementById("fileUploadForm")
        .addEventListener("submit", async function (event) {
          event.preventDefault();

          const fileUpload = document.getElementById("fileUpload").files[0];
          const parentFolderPath = (document.getElementById(
            "parentFolderPath"
          ).value = folderPath);

          const formData = new FormData();
          formData.append("fileUpload", fileUpload);

          const response = await fetch(
            `/upload-file?parentFolderPath=${parentFolderPath}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          const resultDiv = document.getElementById("result");

          if (response.ok) {
            resultDiv.innerHTML = `<p>${result.message}</p>`;
            document.getElementById("fileUpload").value = "";
            displayFolderStructure(parentFolderPath);
            // location.reload();
          } else {
            resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
          }
        });

      document
        .getElementById("createFileForm")
        .addEventListener("submit", async function (event) {
          event.preventDefault();

          const fileName = document.getElementById("fileName").value;
          const parentFolderPath = (document.getElementById(
            "parentFolderPath"
          ).value = folderPath);

          const response = await fetch(
            `/create-file?parentFolderPath=${parentFolderPath}&fileName=${fileName}.txt`,
            {
              method: "POST",
            }
          );

          const result = await response.json();
          const resultDiv = document.getElementById("result");

          if (response.ok) {
            resultDiv.innerHTML = `<p>${result.message}</p>`;
            document.getElementById("fileName").value = "";
            displayFolderStructure(parentFolderPath);
          } else {
            resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
          }
        });

      displayFolderStructure(folderPath);
      document.getElementById("folderStructure").style.display = "block";

      console.log("Folder contents:", folderContents);
      document.getElementById("resultsofsearch").style.display = "none";
      document
        .getElementById("folderForm")
        .addEventListener("submit", async function (event) {
          event.preventDefault();

          const folderName = document.getElementById("folderName").value;
          const parentFolderPath = (document.getElementById(
            "parentFolderPath"
          ).value = folderPath);

          const response = await fetch("/create-folder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ folderName, parentFolderPath }),
          });

          const result = await response.json();
          const resultDiv = document.getElementById("result");

          if (response.ok) {
            resultDiv.innerHTML = `<p>${result.message}</p>`;
            document.getElementById("folderName").value = "";
            displayFolderStructure(parentFolderPath);
          } else {
            resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
          }
        });
    } else {
      console.error("Failed to open folder:", folderPath);
      alert("Failed to open the folder.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while opening the folder.");
  }
}

function displayFolderContents(folderContents) {
  console.log("Folder contents:", folderContents);
}

const listView = document.getElementById("listview");
const gridview = document.getElementById("gridview");
const listViewdisplay = document.getElementById("folderStructure");
const listviewname = document.querySelectorAll(".folder");
listviewname.forEach((element) => {
  element.classList.add("new-class-name");
});
listView.addEventListener("click", () => {
  listViewdisplay.classList.add("listviewclass");
});

gridview.addEventListener("click", () => {
  listViewdisplay.classList.remove("listviewclass");
});

//     var settings = Object.assign({}, defaults, options);

//     // Plugin logic here
//     element.innerText = settings.message;
//   }

//   // Register plugin function under a namespace
//   window.myPlugin = myPlugin;
// })(window, document);
