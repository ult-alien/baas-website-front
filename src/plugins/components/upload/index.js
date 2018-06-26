import Upload from './upload.vue';
import UploadModal from './upload-modal.vue';

Upload.install = function (Vue) {
  Vue.component(Upload.name, Upload);
  Vue.component(UploadModal.name, UploadModal);
};

export default {Upload, UploadModal};
