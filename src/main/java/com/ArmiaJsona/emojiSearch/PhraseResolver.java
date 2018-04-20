package com.ArmiaJsona.emojiSearch;

import com.ArmiaJsona.emojiSearch.emoji.EmojiClient;
import com.ArmiaJsona.emojiSearch.translator.TranslatorClient;
import org.springframework.stereotype.Service;

@Service
public class PhraseResolver {

    private TranslatorClient translatorClient;
    private EmojiClient emojiClient;

    public PhraseResolver(TranslatorClient translatorClient, EmojiClient emojiClient) {
        this.translatorClient = translatorClient;
        this.emojiClient = emojiClient;
    }

    public String translatePhrasesWithEmojiToText(String phrase) {
        phrase = PhraseParser.splitPhraseWithEmojis(phrase);

        StringBuilder stringBuilder = new StringBuilder();
        for (String word : phrase.split(" ")) {
            if (isWordEmoji(word)) {
                String emojiName = emojiClient.getEmojiNameByUnicode(word);
                String emojiNameInPolish = translatorClient.getTranslation(emojiName);
                stringBuilder.append(emojiNameInPolish)
                        .append(" ");
            } else {
                stringBuilder.append(word)
                        .append(" ");
            }
        }
        return stringBuilder.toString().trim();
    }

    private boolean isWordEmoji(String word) {
        return Character.isSurrogate(word.charAt(0));
    }
}