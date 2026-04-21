function calculateResult() {
    let subjects = Number(document.getElementById("subjects").value);
    let total =0 ;
    for(let i=0;i<subjects;i++){
        let marks = Number(prompt("Enter marks for subject " + 1));
        total += marks;
    }
    let average= total/subjects;

    document.getElementById("output")
}