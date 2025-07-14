let res = document.getElementById("searchResults");
let inp = document.getElementById("searchInput");
let load = document.getElementById("spinner");

function show(result) {
    let {
        link,
        title,
        description
    } = result;

    let div_con = document.createElement("div");
    div_con.classList.add("result-item");


    let head = document.createElement("a");
    head.classList.add("result-title");
    head.href = link;
    head.target = "_blank";
    head.textContent = title;
    div_con.appendChild(head);

    let li = document.createElement("a");
    li.href = link;
    li.textContent = link;
    li.target = "_blank";
    li.classList.add("result-url")
    div_con.appendChild(li);

    let para = document.createElement("p");
    para.textContent = description;
    para.classList.add("link-description");
    div_con.appendChild(para);

    res.appendChild(div_con);
}


function display(search_results) {
    load.classList.add("d-none");
    for (let result of search_results) {
        show(result);
    }
}


function press(event) {
    let input = inp.value;
    if (event.key === "Enter") {
        load.classList.remove("d-none")
        res.textContent = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + input;

        let info = {
            method: "GET",
        }
        fetch(url, info)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                let {
                    search_results
                } = data;
                display(search_results);
            })
    }
}

inp.addEventListener("keydown", press);