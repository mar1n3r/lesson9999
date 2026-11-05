$(".add-btn").click(function () {

    const title = $(".note-input1").val().trim();
    const text = $(".note-input2").val().trim();
    const date = $(".note-input3").val().trim();

    if (title === "" && text === "" && date === "") return;

    const colorClasses = ["color1", "color2", "color3", "color4", "color5"];
    const randomClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    $(".notes-container").append(
    `<div class="note-card ${randomClass}" data-status="active">
        <h3>${title}</h3>
        <p class="note-text">${text}</p>
        <p class="note-date">${date}</p>
        
        <button class="add-btn-archive">
            <i class="fa-solid fa-box-archive"></i>
        </button>
        
        <button class="add-btn-delete">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>`
    );

    alert("Note added!");
    filterNotes();
    saveNotes();
    $(".note-input1, .note-input2, .note-input3").val("");

});


$(".notes-container").on("click", ".add-btn-delete", function () {
    $(this).closest(".note-card").fadeOut(300, function () {
        $(this).remove();
        saveNotes();
    });

    alert("Are you sure you want to delete this note?")
});

$(".add-btn-theme").click(function () {
    $("body").toggleClass("dark-theme");

    if ($("body").hasClass("dark-theme")) {
        localStorage.setItem("mySiteTheme", "dark");
    } else {
        localStorage.setItem("mySiteTheme", "light");
    }
});

$(".notes-container").on("click", ".add-btn-archive", function () {
    const $card = $(this).closest(".note-card");
    const currentStatus = $card.attr("data-status");

    if (currentStatus === "active") {
        $card.attr("data-status", "archived");
        $(this).html('<i class="fa-solid fa-box-open"></i>');
    } else {
        $card.attr("data-status", "active");
        $(this).html('<i class="fa-solid fa-box-archive"></i>');
    }

    filterNotes();
    saveNotes();
});

$(".status-filter").change(function () {
    filterNotes();
});

function filterNotes() {
    const selectedFilter = $(".status-filter").val() || "active"; 

    $(".note-card").each(function () {
        const cardStatus = $(this).attr("data-status");

        if (cardStatus === selectedFilter) {
            $(this).fadeIn(250); 
        } else {
            $(this).fadeOut(250); 
        }
    });
}


function saveNotes() {
    localStorage.setItem("myNotesHtml", $(".notes-container").html());
}

function loadNotes() {
    const savedHtml = localStorage.getItem("myNotesHtml");
    if (savedHtml) {
        $(".notes-container").html(savedHtml);
    }
    filterNotes();
}


function loadTheme() {
    const savedTheme = localStorage.getItem("mySiteTheme");
    
    if (savedTheme === "dark") {
        $("body").addClass("dark-theme");
    } else {
        $("body").removeClass("dark-theme");
    }
}

filterNotes();
loadNotes();
loadTheme();