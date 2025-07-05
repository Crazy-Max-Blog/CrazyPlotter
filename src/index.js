import './index.css';
import SVPlot from '@alexgyver/svplot';
import SerialJS from '@alexgyver/serial';

let plot;
let ser = new SerialJS();

document.addEventListener("DOMContentLoaded", () => {
    let dark = true;
    // dark = false;
    
    plot = new SVPlot(document.getElementById('plot'), { type: 'stack', dark: dark });

    document.getElementById("select_b").onclick = () => ser.select();
    document.getElementById("open_b").onclick = () => ser.open();
    document.getElementById("close_b").onclick = () => ser.close();
});

//var title = "Plot";
//var lbls = [];
//var data = [];

function parse(str) {
  if (str.startsWith("#")) {
    //title = str.substring(1);
    //console.log(str.substring(1));
    document.getElementById('title').textContent = str.substring(1);
    return;
  }

  //if(str.startsWith('!')) str = str.substring(1); // Обратная совместимость с v0.1.0

  const s = str.split(/[;,]/);
  if (s.length === 0) return;

  if (/\d/.test(s[0].charAt(0)) || (s[0].charAt(0) === '-' && /\d/.test(s[0].charAt(1)))) {
    const arr = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
      arr[i] = parseFloat(s[i].trim());
    }
    //data.push(arr);
    plot.setData(arr);
  } else {
    //lbls = s;
    console.log(s);
    plot.setConfig({ labels: s });
  }
}

function clear() {
  var title = "Plot";
  var lbls = [];
  var data = [];
}



ser.reader.ontext = t => {
    console.log(t);
    parse(t);
}

// state
ser.onopen = () => {
    console.log('Opened', ser.getName());
}
ser.onclose = () => {
    console.log('Closed');
}
ser.onerror = e => {
    console.log(e);
}
ser.onportchange = () => {
    console.log('port change', ser.selected(), ser.getName());
}