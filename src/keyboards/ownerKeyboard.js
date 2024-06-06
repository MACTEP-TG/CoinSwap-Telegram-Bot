import {Keyboard} from "grammy";

export const ownerKeyboard = new Keyboard()
    .text("💰 Изменить %").row()
    .text("🚔 Сделать админом").row()
    .text("👤 Сделать пользователем").row()
    .resized()