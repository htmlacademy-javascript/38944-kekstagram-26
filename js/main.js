import './upload.js';
import {loadPhotos} from './api.js';
import {renderErrorMessage} from './error-popup.js';
import {renderPhotos} from './gallery.js';

loadPhotos(renderPhotos, renderErrorMessage);
