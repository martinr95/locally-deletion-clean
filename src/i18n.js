import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      deleteTitle: "Delete Your AlmadinApp Account",
      email: "Email",
      password: "Password",
      confirmLabel: "I understand this will permanently delete my account.",
      deleteButton: "Delete My Account",
      deleting: "Deleting...",
      irreversibleNote:
        "This action is irreversible. Your data will be permanently deleted. Questions? Contact us at",
      deletingDisclaimerFinale:
        "After your successful account deletion, AlmadinApp will have no further data regarding your profile, person or behaviour.",
      loginError: "Login failed. Please check your credentials.",
      confirmError: "You must confirm before deleting.",
      profileDeleteFail: "Auth deleted, but profile deletion failed.",
      deleteSuccess: "Your account and profile were deleted successfully.",
      deleteFail: "Deletion failed.",
    },
  },
  de: {
    translation: {
      deleteTitle: "Lösche deinen AlmadinApp-Account",
      email: "E-Mail",
      password: "Passwort",
      confirmLabel: "Ich verstehe, dass mein Konto dauerhaft gelöscht wird.",
      deleteButton: "Konto löschen",
      deleting: "Wird gelöscht...",
      irreversibleNote:
        "Diese Aktion ist unwiderruflich. Deine Daten werden dauerhaft gelöscht. Fragen? Kontaktiere uns unter",
      deletingDisclaimerFinale:
        "After your successful account deletion, AlmadinApp will have no further data regarding your profile, person or behaviour.",
      loginError: "Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.",
      confirmError: "Du musst bestätigen, bevor gelöscht wird.",
      profileDeleteFail:
        "Auth gelöscht, aber Profil konnte nicht gelöscht werden.",
      deleteSuccess: "Dein Konto und Profil wurden erfolgreich gelöscht.",
      deleteFail: "Löschung fehlgeschlagen.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
