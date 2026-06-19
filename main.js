const form = document.getElementById("partnerForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

function showMessage(text, type) {
  if (!message) return;

  message.textContent = text;
  message.className = type;
}

function hasSelectedSkill() {
  const checkedSkills = document.querySelectorAll('input[name="Skills"]:checked');
  return checkedSkills.length > 0;
}

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!hasSelectedSkill()) {
      showMessage("Please select at least one skill.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        showMessage("Application submitted successfully. Thank you.", "success");
      } else {
        showMessage("Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      showMessage("Network error. Please check your connection and try again.", "error");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";
  });
}
