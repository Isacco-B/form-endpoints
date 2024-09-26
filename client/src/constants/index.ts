export const languages = {
  html_form: {
    css: `<style>
  #contactForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
  }
  #contactForm input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }
</style>`,
    html: `<form id="contactForm" method="POST" action="https://demo13.isaccobertoli.com/your@email.com">
  <label for="name">Name*</label>
  <input name="name" required/>

  <label for="email">Email*</label>
  <input name="email" type="email" required/>

  <label for="message">Message*</label>
  <textarea name="message" required></textarea>

  <button type="submit">Submit</button>
</form>`,
  },
  json_form: {
    javascript: `<script>
  const BASEURL = "https://demo13.isaccobertoli.com/your@email.com";
  const form = document.getElementById("contactForm");
  const responseDiv = document.getElementById("responseMessage");
  const submitButton = document.getElementById("submitButton");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    submitButton.classList.add("loading");
    submitButton.disabled = true;

    try {
      const response = await fetch(BASEURL, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        responseDiv.style.display = "block";
        responseDiv.innerText = result.message;
        responseDiv.className = "success";
        form.reset();
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      responseDiv.style.display = "block";
      responseDiv.innerText = error.message;
      responseDiv.className = "error";
    } finally {
      submitButton.classList.remove("loading");
      submitButton.disabled = false;
      setTimeout(() => {
        responseDiv.style.display = "none";
      }, 5000);
    }
  });
</script>`,
    css: `<style>
  .loading {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .loading::after {
    content: "";
    display: inline-flex;
    gap: 0.5rem;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: #ffffff;
    width: 1em;
    height: 1em;
    animation: spin 1s linear infinite;
    margin-left: 8px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  #contactForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
  }
  #responseMessage {
    display: none;
    padding: 15px;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
  }
  .error {
    color: #b91c1c;
    border-color: #b91c1c;
    border-style: solid;
    border-width: 1px;
  }
  .success {
    color: #047857;
    border-color: #047857;
    border-style: solid;
    border-width: 1px;
  }
  #contactForm input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }
</style>`,
    html: `<form id="contactForm">
  <label for="name">Name*</label>
  <input name="name" required/>

  <label for="email">Email*</label>
  <input name="email" type="email" required/>

  <label for="message">Message*</label>
  <textarea name="message" required></textarea>

  <div id="responseMessage"></div>
  <button id="submitButton" type="submit">Submit</button>
</form>`,
  },
};
