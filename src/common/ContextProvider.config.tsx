// dang ky cac provider vao context provider

import DataShareProvider from "./services/data-share/DataShare.provider";
import { DialogProvider } from "./services/dialog/Dialog.provider";
import LoadingProvider from "./services/loading/Loading.provider";

export const ContextProviderConfig = (props: any) => {

    return (
        <LoadingProvider>
            <DataShareProvider>
                <DialogProvider >
                    {props.children}
                </DialogProvider>
            </DataShareProvider>
        </LoadingProvider>
    );
}