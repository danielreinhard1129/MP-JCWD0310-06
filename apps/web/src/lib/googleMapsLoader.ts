import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: 'AIzaSyDlCOTI3ft1uLexO8_mi45hKea7XWU_Iik',
  version: 'weekly',
  libraries: ['places'],
});

export default loader;
