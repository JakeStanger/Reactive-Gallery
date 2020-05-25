import React from "react";
import styles from "./Upload.module.scss";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondImagePreview from "filepond-plugin-image-preview";
import FilePondValidateType from "filepond-plugin-file-validate-type";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import IUploadState from "./IUploadState";
import EditForm from "../../components/editForm/EditForm";

import { startCase } from "lodash";
import { RouteComponentProps } from "react-router-dom";

registerPlugin(FilePondImagePreview);
registerPlugin(FilePondValidateType);

class Upload extends React.Component<{}, IUploadState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      file: null
    };
  }

  private _onUpload = async (
    _fieldName: string,
    file: File,
    _metadata: { [key: string]: any },
    load: (p: string | { [key: string]: any }) => void,
    error: (errorText: string) => void,
    progress: (computable: boolean, loaded: number, total: number) => void,
    _abort: () => void
  ) => {
    try {
      progress(false, 0, 100);
      this.setState({ file, error: undefined });
      load(file);
      progress(false, 100, 100);
    } catch (err) {
      error(err);
      this.setState({ error: err });
    }
  };

  public render() {
    const { file, error } = this.state;

    return (
      <div>
        <FilePond
          acceptedFileTypes={["image/*"]}
          server={{
            process: this._onUpload,
            revert: () => this.setState({ file: null, error: undefined })
          }}
        />
        <div className={styles.container}>
          {error && <div className={styles.error}>{JSON.parse(error).msg}</div>}
        </div>
        {file && (
          <EditForm
            image={{
              filename: file.name,
              name: startCase(file.name.split(".")[0])
            }}
            mode="upload"
            file={file}
            onError={errorMsg => this.setState({ error: errorMsg })}
            history={(this.props as any).history}
          />
        )}
      </div>
    );
  }
}

export default Upload;
