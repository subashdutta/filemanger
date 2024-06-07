  const newPath = folderPath ? `${folderPath}` : `${folderPath}`;
    historyStack.push(newPath);
    updateURLParameter("currentFolder", newPath);
    document.getElementById("parentFolderContainer").style.display = "block";
    document.getElementById("parentFolderPath").value = newPath;
