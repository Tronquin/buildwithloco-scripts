(function () {
  async function getConfig() {
    let projectId = 10;
    const scripts = [...document.querySelectorAll("script")];
    const ourScript = scripts.filter((s) =>
      s.src.match(new RegExp(`\?project_id=${projectId}`))
    )[0];

    if (ourScript) {
      const shopMatch = ourScript.src.match(/shop=(.*)/);
      if (!shopMatch) return null;
      const shop = shopMatch[1];
      const response = await fetch(
        `https://api.buildwithloco.com/projects/8/websites/configs?shop=${shop}`
      );
      const data = await response.json();
      return data;
    }
    return {};
  }

  // Fetch store config
  getConfig().then((data) => {
    // Read your config keys: theme
    const spinner = data.spinner_type | "circular-spinner";
    const stylesheet = document.createElement("style");
    const className = "";
    const overlay = document.createElement("div");
    const spinner = document.createElement("div");
    overlay.classList.add("now-loading--overlay");

    switch (spinner) {
      case "circular-spinner":
        className = "circular";
        stylesheet.innerHTML = `
                    .${className} {
                        width:100px;
                        height:100px;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        margin:10px 20px;
                    }

                    .${className}::before {
                        content:"";
                        color: ${data.spinner_main_color};
                        height:50px;
                        width:50px;
                        background:transparent;
                        border-radius:50%;
                        border:10px solid transparent;
                        border-color: ${data.spinner_main_color} ${data.spinner_main_color} transparent transparent;
                        animation:load8 .6s infinite;
                    }
                    @keyframes ${className}{
                        100%{
                        transform:rotatez(360deg);
                        }
                    }
                `;

        break;
      case "loading-bar":
        break;
      case "clock":
        break;
      case "battery":
        break;
      case "two-dots":
        break;
      case "rectangle":
        break;
      case "morph":
        break;
      case "balls":
        break;
      case "custom":
        break;
      default:
        break;
    }

    spinner.classList.add(className);
    overlay.appendChild(spinner);
    document.head.appendChild(style);
    // TODO: Your business logic here
  });
})();
