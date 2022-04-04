function menu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  String.prototype.extenso = function (c) {
    var ex = [
      [
        "zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove",
      ],
      [
        "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa",
      ],
      [
        "cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos",
      ],
      [
        "mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão",
      ],
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for (
      var f = n.length - 1, l, j = -1, r = [], s = [], t = "";
      ++j <= f;
      s = []
    ) {
      j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
      if (
        !((a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g)),
        (v = l % 3 ? [v.slice(0, l % 3)] : []),
        (v = a ? v.concat(a) : v)).length
      )
        continue;
      for (a = -1, l = v.length; ++a < l; t = "") {
        if (!(i = v[a] * 1)) continue;
        (i % 100 < 20 && (t += ex[0][i % 100])) ||
          ((i % 100) + 1 &&
            (t +=
              ex[1][(((i % 100) / 10) >> 0) - 1] +
              (i % 10 ? e + ex[0][i % 10] : "")));
        s.push(
          (i < 100
            ? t
            : !(i % 100)
            ? ex[2][i == 100 ? 0 : (i / 100) >> 0]
            : ex[2][(i / 100) >> 0] + e + t) +
            ((t = l - a - 2) > -1
              ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t])
              : "")
        );
      }
      a =
        (sl = s.length) > 1
          ? ((a = s.pop()), s.join(" ") + e + a)
          : s.join("") || ((!j && n[j + 1] * 1 > 0) || r.length ? "" : ex[0][0]);
      a &&
        r.push(
          a +
            (c
              ? " " +
                (v.join("") * 1 > 1
                  ? j
                    ? d + "s"
                    : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is")
                  : j
                  ? d
                  : $)
              : "")
        );
    }
    return r.join(e);
  };
  
  function invert() {
    const $from = document.querySelector(".fromSelect");
    const $to = document.querySelector(".toSelect");
  
    //console.log($from + "\n\n" + $to)
  
    if ($from.value == "binário") {
      $from.innerHTML = "<option id='decimal'>decimal</option>";
  
      var $input = parseInt(document.getElementById("input").value);
      var $output = document.getElementById("output").value;
  
      document.getElementById("input").value = $output;
      document.getElementById("output").value = $input;
    } else {
      $from.innerHTML = "<option id='binary'>binário</option>";
    }
  
    if ($to.value == "binário") {
      $to.innerHTML = "<option id='decimal'>decimal</option>";
  
      var $input = parseInt(document.getElementById("input").value);
      var $output = document.getElementById("output").value;
  
      document.getElementById("input").value = $output;
      document.getElementById("output").value = $input;
    } else {
      $to.innerHTML = "<option id='binary'>binário</option>";
    }
  }
  
  function output() {
    const $from = document.querySelector(".fromSelect");
    var $input = parseInt(document.getElementById("input").value);
    var $output = document.getElementById("output");
    var $extenso = document.getElementById("extenso");
  
    if ($from.value == "binário") {
      $output.value = parseInt($input, 2);
  
      $extenso.innerHTML = $output.value.extenso();
    } else {
      $output.value = $input.toString(2);
    }
  }
  
  function copy() {
    var $output = document.getElementById("output");
  
    if ($output.value.length == 0 || $output.value == NaN) {
      let timerInterval;
      Swal.fire({
        title: "Erro",
        html: "Não há nada para copiar!",
        timer: 3000,
        icon: "error",
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    } else {
      $output.select();
      // $output.setSelectionRange(0, 99999); /* For mobile devices */
  
      navigator.clipboard.writeText($output.value);
      let timerInterval;
      Swal.fire({
        title: "Copiado!",
        html: "Valor: " + $output.value,
        timer: 1500,
        icon: "success",
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }
  }
  