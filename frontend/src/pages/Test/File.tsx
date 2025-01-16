import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import { useState } from 'react';
registerPlugin(FilePondPluginFilePoster);
type Props = {
  data:any
}
const File = ({data}:Props) => {
  const [files, setFiles] = useState([]);
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={true}
      filePosterMaxHeight={256}
      server="/api"
      name="files"
      labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
    />
  )
}
export default File