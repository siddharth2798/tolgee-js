import * as React from "react";
import {FunctionComponent} from "react";
import {T, useTranslate} from "@polygloat/react";
import {ChooseLanguage} from "./ChooseLanguage";

export const Page: FunctionComponent<{}> = () => {
    return (
        <div>
            <ChooseLanguage/>
            <h1><T>sampleApp.hello_world!</T></h1>
        </div>
    )
}