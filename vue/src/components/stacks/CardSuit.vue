<template>
  <div class="suit" :class="[bottom ? 'bottom' : top ? 'top' : '', suit, difficultyClass]">
    <svg v-if="suit === 'H'"
       version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px" y="0px" viewBox="0 0 336 316" enable-background="new 0 0 336 316" xml:space="preserve">
        <path id="svg_2" d="m325.673,115.563c-9.712,35.554 -30.536,64.376 -55.441,90.498c-34.404,36.084 -69.285,71.714 -103.981,107.52c-0.353,0.365 -0.971,0.474 0.016,0.018c-38.472,-39.119 -77.022,-77.382 -114.463,-116.703c-26.691,-28.032 -47.264,-60.57 -49.745,-100.082c-2.047,-32.598 10.676,-61.229 38.064,-80.666c24.892,-17.665 52.642,-18.292 79.936,-6.213c25.407,11.244 36.902,33.926 43.557,59.544c0.582,2.239 1.181,4.473 2.158,8.172c3.071,-10.215 4.962,-18.911 8.258,-27.037c12.465,-30.734 36.319,-47.865 68.591,-49.968c28.013,-1.827 56.415,13.551 74.153,44.642c15.047,26.376 9.318,68.735 8.897,70.275z" clip-rule="evenodd" fill-rule="evenodd"/>/>
      </svg>

    <svg v-if="suit === 'C'"
      version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" viewBox="0 0 346 356" enable-background="new 0 0 346 356" xml:space="preserve">
      <path id="svg_1" d="m335.635,229.305c-12.122,43.007 -49.747,58.445 -92.259,52.941c-16.351,-2.116 -29.876,-9.655 -41.632,-20.853c-1.535,-1.463 -3.215,-2.773 -5.017,-4.315c-7.013,21.926 -0.403,40.541 30.712,87.017c-34.895,0 -69.291,0 -104.578,0c19.121,-25.208 36.383,-50.753 28.219,-85.044c-9.635,5.934 -17.93,11.985 -27.001,16.46c-34.971,17.255 -90.324,8.329 -111.167,-37.841c-17.043,-37.75 -5.798,-84.443 25.518,-105.194c20.065,-13.297 41.39,-16.25 65.057,-6.411c-3.444,-4.998 -6.486,-9.006 -9.104,-13.273c-28.357,-46.242 -4.661,-99.615 48.499,-109.87c24.449,-4.717 47.947,-2.63 70.814,7.354c44.759,19.542 50.379,75.393 27.748,105.681c-2.319,3.104 -4.645,6.205 -8.098,10.815c16.521,-7.409 32.264,-7.851 47.983,-4.115c26.762,6.361 43.778,22.565 54.111,48.744c10.046,25.446 0.536,56.699 0.195,57.904z" clip-rule="evenodd" fill-rule="evenodd"/>
    </svg>

    <svg v-if="suit === 'S'"
      version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" viewBox="0 0 316 376" enable-background="new 0 0 316 376" xml:space="preserve">
      <path
      id="svg_3" d="m154.61,2.248c34.446,23.316 118.694,94.258 151.071,186.615c10.962,39.732 -2.836,85.749 -37.404,101.76c-47.473,21.987 -89.612,-6.907 -92.371,-9.146c-4.873,17.264 -0.002,29.676 7.095,43.998c7.047,14.222 16.076,27.461 24.36,41.339c-34.387,0 -69.216,0 -105.276,0c19.775,-25.626 37.132,-51.712 29.162,-85.36c-11.857,5.198 -22.633,11.833 -34.332,14.708c-104.423,16.449 -100.286,-79.059 -91.17,-107.475c21.543,-67.152 121.659,-164.216 148.865,-186.439z" clip-rule="evenodd" fill-rule="evenodd"/>
    </svg>

    <svg v-if="suit === 'D'"
      version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" viewBox="0 0 326 386" enable-background="new 0 0 326 386" xml:space="preserve">
      <path id="svg_4" d="m161.099,5.087c0,0 112.564,135.628 152.711,183.682c0,0 -152.709,192.084 -153.82,192.084c-1.494,-2.583 -156.13,-191.982 -156.13,-191.982l157.239,-183.784z" clip-rule="evenodd" fill-rule="evenodd"/>
    </svg>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'CardSuit',
    props: {
      card: null,
      top: { default: true, type: Boolean },
      bottom: { default: false, type: Boolean },
    },
    computed: {
      ...mapState(['difficulty']),
      suit() {
        return this.card && this.card.cardSuit;
      },
      difficultyClass() {
        switch (this.difficulty) {
          case '1': return 'one-color';
          case '2': return 'two-colors';
          default:
          case '4': return 'four-colors';
        }
      },
    },
  };
</script>
<style scoped>
  .suit {
    margin: 2px auto;
    width: 40px;
  }

  .suit.top {

  }

  .suit.bottom {
    transform-origin: bottom right;
    transform:
    rotate(180deg)
    translate(100%, 110%);
  }
  .suit.H svg > path {
    fill: #ED1C24;
  }
  .suit.C svg > path {
    fill: #0000FF;
  }
  .suit.S svg > path {
    fill: #000000;
  }
  .suit.D svg > path {
    fill: #00FF00;
  }

  .suit.C.two-colors svg > path {
    fill: #000000;
  }
  .suit.D.two-colors svg > path {
    fill: #ED1C24;
  }

  .suit.H.one-color svg > path {
    fill: #000000;
  }
  .suit.C.one-color svg > path {
    fill: #000000;
  }
  .suit.S.one-color svg > path {
    fill: #000000;
  }
  .suit.D.one-color svg > path {
    fill: #000000;
  }
</style>
