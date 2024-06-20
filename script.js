const clearButton = document.querySelector(".clear")


fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    return response.json();
  })
  .then(data => {
    renderCardData(data)
    addTagSelector()
  })
  .catch(error => {
    console.log("Error: ", error);
  });


function renderCardData(data) {
    const cardSection = document.querySelector(".card-section");

    data.forEach(dataitem => {
      const card = document.createElement("article");
      card.classList.add("card");
      card.id = `card${dataitem.id}`;


      const nameAndPic = document.createElement("div");
      nameAndPic.classList.add("name-and-pic");


      const logo = document.createElement("img");
      logo.classList.add("logo");
      logo.src = dataitem.logo;
      logo.alt = "Company Logo";
      nameAndPic.appendChild(logo);


      const contentArea = document.createElement("div");
      contentArea.classList.add("content-area");


      const name = document.createElement("div");
      name.classList.add("name");


      const companyName = document.createElement("h3");
      companyName.classList.add("company-name");
      companyName.textContent = dataitem.company;
      name.appendChild(companyName);


      const features = document.createElement("div")
      features.classList.add("features")
      name.appendChild(features)
      if (dataitem.new) {
        const newFeature = createFeatureTag("New!", "feature1");
        features.appendChild(newFeature);
      }

      if (dataitem.featured) {
        const featuredFeature = createFeatureTag("Featured", "feature2");
        features.appendChild(featuredFeature);
      }

      contentArea.appendChild(name);

      const positionDetail = document.createElement("div");
      positionDetail.classList.add("position-detail");

      const position = document.createElement("h1");
      position.classList.add("position");
      position.textContent = dataitem.position;
      positionDetail.appendChild(position);
      contentArea.appendChild(positionDetail);

      const details = document.createElement("div");
      details.classList.add("details");

      const postedAtDetails = document.createElement("p");
      postedAtDetails.classList.add("postedAt-details");
      postedAtDetails.textContent = dataitem.postedAt;
      details.appendChild(postedAtDetails);

      details.appendChild(document.createTextNode(" . "));

      const contractDetails = document.createElement("p");
      contractDetails.classList.add("contract-details");
      contractDetails.textContent = dataitem.contract;
      details.appendChild(contractDetails);

      details.appendChild(document.createTextNode(" . "));

      const locationDetails = document.createElement("p");
      locationDetails.classList.add("location-details");
      locationDetails.textContent = dataitem.location;
      details.appendChild(locationDetails);

      contentArea.appendChild(details);

      nameAndPic.appendChild(contentArea);
      card.appendChild(nameAndPic);

      // Create tag-section
      const tagSection = document.createElement("div");
      tagSection.classList.add("tag-section");

      const roleTag = createTag("role", dataitem.role);
      const levelTag = createTag("level", dataitem.level);
      tagSection.appendChild(roleTag);
      tagSection.appendChild(levelTag);

      const languagesContainer = document.createElement("div");
      languagesContainer.classList.add("languages");
      dataitem.languages.forEach(language => {
        const languageTag = createTag("tag", language);
        languagesContainer.appendChild(languageTag);
      });
      tagSection.appendChild(languagesContainer);

      const toolsContainer = document.createElement("div");
      toolsContainer.classList.add("tools");
      dataitem.tools.forEach(tool => {
        const toolTag = createTag("tag", tool);
        toolsContainer.appendChild(toolTag);
      });
      tagSection.appendChild(toolsContainer);

      card.appendChild(tagSection);
      cardSection.appendChild(card);
    });
}


function createTag(className, textContent) {
  const tag = document.createElement("div");
  tag.classList.add("tag", className);
  tag.textContent = textContent;
  return tag;
}


function createFeatureTag(textContent, className) {
  const featureTag = document.createElement("div");
  featureTag.classList.add(className);
  const pTag = document.createElement("p");
  pTag.textContent = textContent;
  featureTag.appendChild(pTag);
  return featureTag;
}


function createSelectionTag(textContent) {
    const selectionTag = document.createElement("div")
    selectionTag.classList.add("tag", "selection-tag")

    const pTag = document.createElement("p")
    pTag.textContent = textContent
    selectionTag.appendChild(pTag)

    const crossIconSection = document.createElement("div")
    crossIconSection.classList.add("cross")

    const crossIcon = document.createElement("img")
    crossIcon.src = "./images/icon-remove.svg"
    crossIcon.alt = "Cross Icon"
    crossIconSection.appendChild(crossIcon)

    selectionTag.appendChild(crossIconSection)
    
    crossIcon.addEventListener("click", () => {
        selectionTag.remove()
        filterSearch()
    })

    return selectionTag
}


function filterSearch() {
    const filterTags = Array.from(document.querySelectorAll(".selection-tag")).map(tag => tag.textContent.trim())
    const cards = document.querySelectorAll(".card")
    let count = 0
    cards.forEach(card => {
        const cardTags = Array.from(card.querySelectorAll(".tag")).map(tag => tag.textContent.trim())
        const hasMatchingTag = filterTags.some(tag => cardTags.includes(tag))
        if(filterTags.length === 0 || hasMatchingTag) {
            card.style.display = "flex"
        }
        else {
            card.style.display = "none"
        }
    })
}


function clearFilterTags() {
    const selectionTags = document.querySelectorAll(".selection-tag")
    selectionTags.forEach(selectionTag => {
        selectionTag.remove()
    })
}

clearButton.addEventListener("click", clearFilterTags)


function addTagSelector() {
    const tags = document.querySelectorAll(".tag")
    const selectionTagsSection = document.querySelector(".selection-tags")
    const filterPanel = document.querySelector(".filter-panel")
    tags.forEach(tag => {
        tag.addEventListener("click", () => {
            const selectionTag = createSelectionTag(tag.textContent)
            const currSelectionTags = document.querySelectorAll(".selection-tag")
            let count = 0

            currSelectionTags.forEach(selectTag => {
                if(selectionTag.textContent === selectTag.textContent.trim()) {
                    count++
                }
            })

            if(count === 0) {
                filterPanel.style.display = "block"
                selectionTagsSection.appendChild(selectionTag)
                filterSearch()
            }
        })
    })
}
