import {Lifecycle, scoped} from "tsyringe";
import {AbstractHandler} from "./AbstractHandler";
import {Properties} from "../Properties";
import {NodeHelper} from "../helpers/NodeHelper";
import {TextService} from "../services/TextService";
import {ElementRegistrar} from "../services/ElementRegistrar";
import {TranslationHighlighter} from "../highlighter/TranslationHighlighter";

@scoped(Lifecycle.ContainerScoped)
export class AttributeHandler extends AbstractHandler {
    constructor(protected properties: Properties,
                protected textService: TextService,
                protected elementRegistrar: ElementRegistrar,
                protected translationHighlighter: TranslationHighlighter) {
        super(properties, textService, elementRegistrar, translationHighlighter);
    }

    async handle(node: Element) {
        let inputPrefix = this.properties.config.inputPrefix;
        let inputSuffix = this.properties.config.inputSuffix;

        for (let [tag, attributes] of Object.entries(this.properties.config.tagAttributes)) {
            for (let attribute of attributes) {
                let expression = `descendant-or-self::${tag}/@${attribute}[contains(., '${inputPrefix}') and contains(., '${inputSuffix}')]`;
                const nodes: Array<Attr | Text> = NodeHelper.evaluate(expression, node);
                await this.handleNodes(nodes);
            }
        }
    }
}