jest.autoMockOff();

import '@testing-library/jest-dom/extend-expect';
import { UI } from '../index';
import { NodeHelper } from '@tolgee/core';
import type { TranslationService } from '@tolgee/core/lib/services/TranslationService';

test('it selects the key', (done) => {
  const ui = new UI({
    coreService: {} as any,
    properties: {} as any,
    translationService: {
      getFromCacheOrFallback: jest.fn(() => 'Translated key'),
    } as any as TranslationService,
    eventService: {} as any,
    apiHttpService: {} as any,
    mouseEventHandler: {} as any,
    textService: {} as any,
    highlightFunctionInitializer: {} as any,
    translationHighlighter: {} as any,
    elementRegistrar: {} as any,
    observer: {} as any,
    messages: {} as any,
    pluginManager: {} as any,
    screenshotService: {} as any,
    wrapper: {} as any,
    moduleService: {} as any,
    init: () => {},
    run: () => {},
    stop: () => {},
  });

  const mouseEvent = new MouseEvent('click');
  const keys = ['key 1', 'key 2'];

  // open context menu and wait for select
  ui.getKey({ openEvent: mouseEvent, keys: new Set(keys) }).then((key) => {
    expect(key).toEqual('key 2');
    done();
  });

  // check if keys and translations are in dom
  for (const key of keys) {
    const element = NodeHelper.evaluateToSingle(
      `//*[contains(text(), '${key}')]`,
      document.body
    );
    // @ts-ignore
    expect(element).toBeInTheDocument();
  }
  const translatedKeys = NodeHelper.evaluate(
    `//*[contains(text(), 'Translated key')]`,
    document.body
  );
  expect(translatedKeys).toHaveLength(2);

  // get key 2 and click it
  const element = NodeHelper.evaluateToSingle(
    `//*[contains(text(), 'key 2')]`,
    document.body
  );
  element.parentElement.click();
});
