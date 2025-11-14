let count = 1;

function participantTemplate(num) {
    return `
        <section class="participant${num}">
            <p>Participant ${num}</p>

            <div class="item">
                <label for="fname${num}"> First Name<span>*</span></label>
                <input id="fname${num}" type="text" name="fname${num}" required />
            </div>

            <div class="item activities">
                <label for="activity${num}">Activity #<span>*</span></label>
                <input id="activity${num}" type="text" name="activity${num}" />
            </div>

            <div class="item">
                <label for="fee${num}">Fee ($)<span>*</span></label>
                <input id="fee${num}" type="number" name="fee${num}" />
            </div>    
            <div class="item">
                <label for="date${num}">Desired Date <span>*</span></label>
                <input id="date${num}" type="date" name="date${num}" />
            </div>

            <div class="item">
                <p>Grade</p>
                <select id="grade${num}" name="grade${num}">
                <option selected value="" disabled></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
                </select>
            </div>           

        </section>
    `;
}

const addButton = document.getElementById("add");
const participantsFieldset = document.querySelector(".participants");

addButton.addEventListener("click", () => {
    count++;
    participantsFieldset.insertAdjacentHTML("beforeend", participantTemplate(count));
});

const form = document.querySelector("form");
const summary = document.getElementById("summary");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const feeInputs = document.querySelectorAll('input[id^="fee"]');

    let totalFees = 0;
    feeInputs.forEach(input => {
        const value = Number(input.value);
        if (!isNaN(value)) {
            totalFees += value;
        }
    });

    const adultName = document.getElementById("adult_name").value;

    const participantCount = document.querySelectorAll('[class^="participant"]').length;

    form.style.display = "none";

    summary.style.display = "block";
    summary.textContent = 
        `Thanks ${adultName} for registering. You have registered ${participantCount} participants and owe $${totalFees} in Fees.`;
});