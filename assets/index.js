document.querySelector("form").onkeydown = function (evt) {
  if (evt.which === 13) {
    evt.preventDefault();
    evt.stopPropagation();
    calculateTax();
  }
};

$(document).ready(function () {
  $("#incomeYear").keyup(function (event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) {
      event.preventDefault();
    }
    var $this = $(this);
    var num = $this.val().replace(/,/gi, "");
    var num2 = num.split(/(?=(?:\d{3})+$)/).join(",");
    console.log(num2);
    // the following line has been simplified. Revision history contains original.
    $this.val(num2);
  });

  // Define regular expression
  var regex = /^\d*[.]?\d*$/;

  $("#incomeYear").on("input", function () {
    // Get input value
    var inputVal = $(this).val();

    // Test input value against regular expression
    if (regex.test(inputVal)) {
      $(this).removeClass("error").addClass("success");
    } else {
      $(this).removeClass("success").addClass("error");
    }
  });
});

function calculateTax() {
  const incomeYearWithComma = document.getElementById("incomeYear").value;
  let incomeYear = parseInt(incomeYearWithComma.replace(/,/g, ""));
  console.log(incomeYear);

  const incomeTax = document.getElementById("tax");
  const alert = document.getElementsByClassName("alert");

  if (incomeYear <= 54000000) {
    alert[0].className = "alert alert-danger";
    incomeTax.innerText = `Masuk Pendapatan Tidak Kena Pajak (PTKP) `;
  } else if (incomeYear > 54000000) {
    //   0 - 60 juta
    if (incomeYear > 54000000 && incomeYear <= 60000000) {
      alert[0].className = "alert alert-success";
      const tax60 = incomeYear * (5 / 100);
      incomeTax.innerHTML = `
         Berdasarkan UU PPh yang berlaku, penghasilan anda dikenai pajak satu lapis tarif, yaitu 5%.
         Beban pajak yang ditanggung per tahun sebesar <b> Rp${tax60.toLocaleString(
           "id"
         )} </b>
         Dengan perhitungan:
         <b class="text-end"> 5% x Rp${Number(incomeYear).toLocaleString(
           "id"
         )} = Rp${tax60.toLocaleString("id")}</b>
         `;

      //   60 - 250juta
    } else if (incomeYear > 60000000 && incomeYear <= 250000000) {
      alert[0].className = "alert alert-success";
      const tax60 = 3000000;
      const income60to250 = incomeYear - 60000000;
      const tax60to250 = income60to250 * (15 / 100);
      const total = tax60 + tax60to250;

      incomeTax.innerHTML = `
         Berdasarkan UU PPh yang berlaku, penghasilan anda dikenai pajak dua lapis tarif, yaitu 5% & 15%.
         Beban pajak yang ditanggung per tahun sebesar <b> Rp${total.toLocaleString(
           "id"
         )} </b>
         Dengan perhitungan:
         <p class="text-end"> 5% x Rp60.000.000 = Rp${tax60.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">15% x Rp${income60to250.toLocaleString(
           "id"
         )} = Rp${tax60to250.toLocaleString("id")}</p>
         <b class="text-end"> Total = Rp${total.toLocaleString("id")} </b>
         `;

      // 250 - 500 juta
    } else if (incomeYear > 250000000 && incomeYear <= 500000000) {
      alert[0].className = "alert alert-success";
      const income60to250 = 190000000;
      const income250to500 = incomeYear - (income60to250 + 60000000);

      const tax60 = 3000000;
      const tax60to250 = 47500000;
      const tax250to500 = income250to500 * (25 / 100);
      const total = tax60 + tax60to250 + tax250to500;

      incomeTax.innerHTML = `
         Berdasarkan UU PPh yang berlaku, penghasilan anda dikenai pajak tiga lapis tarif, yaitu 5%, 15% & 25%.
         Beban pajak yang ditanggung per tahun sebesar <b> Rp${total.toLocaleString(
           "id"
         )} </b> <br>
         Dengan perhitungan:
         <p class="text-end">5% x Rp60.000.000 = Rp${tax60.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">15% x Rp190.000.000 = Rp${tax60to250.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">25% x Rp250.000.000 = Rp${tax250to500.toLocaleString(
           "id"
         )}</p>
         <b class="text-end"> Total = Rp${total.toLocaleString("id")} </b>
         `;

      // 500 juta - 5 M
    } else if (incomeYear > 500000000 && incomeYear <= 5000000000) {
      alert[0].className = "alert alert-success";
      const income250to500 = 250000000;
      const income500to5M = incomeYear - income250to500;

      const tax60 = 3000000;
      const tax60to250 = 47500000;
      const tax250to500 = 62500000;
      const tax500to5M = income500to5M * (30 / 100);
      const total = tax60 + tax60to250 + tax250to500 + tax500to5M;

      incomeTax.innerHTML = `
         Berdasarkan UU PPh yang berlaku, penghasilan anda dikenai pajak empat lapis tarif, yaitu 5%, 15%, 25%, 30% & 35%.
         Beban pajak yang ditanggung per tahun sebesar <b> Rp${total.toLocaleString(
           "id"
         )} </b>
         Dengan perhitungan:
         <p class="text-end">5% x Rp60.000.000= Rp${tax60.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">15% x Rp190.000.000 = Rp${tax60to250.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">25% x Rp250.000.000 = Rp${tax250to500.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">30% x Rp${income500to5M.toLocaleString(
           "id"
         )}= Rp${tax500to5M.toLocaleString("id")}</p>
         <b class="text-end"> Total = Rp${total.toLocaleString("id")} </b>
         `;
      // > 5 M
    } else {
      alert[0].className = "alert alert-success";
      const income500to5M = 4750000000;
      const incomePlus5M = incomeYear - income500to5M;

      const tax60 = 3000000;
      const tax60to250 = 47500000;
      const tax250to500 = 62500000;
      const tax500to5M = 1425000000;
      const taxPlus5M = incomePlus5M * (35 / 100);
      const total = tax60 + tax60to250 + tax250to500 + tax500to5M + taxPlus5M;

      incomeTax.innerHTML = `
         Berdasarkan UU PPh yang berlaku, penghasilan anda dikenai pajak empat lapis tarif, yaitu 5%, 15%, 25%, 30% & 35%.
         Beban pajak yang ditanggung per tahun sebesar <b> Rp${total.toLocaleString(
           "id"
         )} </b>
         Dengan perhitungan:
         <p class="text-end">5% x Rp60.000.000 = Rp${tax60.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">15% x Rp190.000.000 = Rp${tax60to250.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">25% x Rp250.000.000 = Rp${tax250to500.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">30% x Rp4.750.000.000 = Rp${tax500to5M.toLocaleString(
           "id"
         )}</p>
         <p class="text-end">35% x Rp${incomePlus5M.toLocaleString(
           "id"
         )} = Rp${taxPlus5M.toLocaleString("id")}</p>
         <p class="text-end"><b class="text-end"> Total = Rp${total.toLocaleString(
           "id"
         )} </b></p>
         `;
    }
  }
}
