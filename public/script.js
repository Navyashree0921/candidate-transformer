const uploadBtn = document.getElementById("uploadBtn");
const backBtn = document.getElementById("backBtn");
const output = document.getElementById("output");

uploadBtn.addEventListener("click", async () => {

    const csv = document.getElementById("csv").files[0];
    const resume = document.getElementById("resume").files[0];

    if (!csv || !resume) {
        alert("Please select both files.");
        return;
    }

    const formData = new FormData();

    formData.append("csv", csv);
    formData.append("resume", resume);

    const response = await fetch("/transform", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    output.textContent = JSON.stringify(data, null, 2);

    output.style.display = "block";
    uploadBtn.style.display = "none";
    backBtn.style.display = "inline-block";

});

backBtn.addEventListener("click", () => {

    output.style.display = "none";
    uploadBtn.style.display = "inline-block";
    backBtn.style.display = "none";

});