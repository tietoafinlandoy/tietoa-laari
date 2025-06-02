import { Timeline, Text } from "@mantine/core";

export default function Changelog() {
  return (
    <Timeline title="Muutosloki">
      <Timeline.Item title="v1.0.6 Statusten suodatus">
        <Text c="dimmed">
          Lisätty suodatusmahdollisuuksin suodatus statusten mukaan.
        </Text>
        <Text size="xs" mt={4}>
          26.11.2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="v1.0.5 Ehdotusten suodatus">
        <Text c="dimmed">
          Lisätty suodatustyökalut, luonti- ja muokkauspäivän mukaan sekä
          tiimeittäin. Lisäksi vähemmän kirkas iltateema vaihtoehdoksi.
        </Text>
        <Text size="xs" mt={4}>
          15.11.2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="v1.0.4 Autentikaatio">
        <Text c="dimmed">
          Autentikaatiopäivitys taustalle, tunnistusevästeet nyt JWT-muotoisia.
          Yö- ja päiväteemat. Sorttausbugi korjattu.
        </Text>
        <Text size="xs" mt={4}>
          1.11.2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="v1.0.3 Tiimit">
        <Text c="dimmed">
          Ehdotukselle voi asettaa yhden tai useamman tiimin, ne ovat
          vapaavalintaisia litteroita. Oletustiimi täytetään ehdotuksen
          asettajan yksikön perusteella. Lisäksi filtteröinti muokkausajan
          mukaan sekä käyttöliittymäpäivityksiä.
        </Text>
        <Text size="xs" mt={4}>
          27.10.2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="v1.0.2 Tietoturvaa">
        <Text c="dimmed">
          Isona asiana autentikaatio Slackin tunnuksien kautta, Laari ei enää
          julki internettiin. Lisäksi hieman parempaa viestien muotoiluiden
          tukemista.
        </Text>
        <Text size="xs" mt={4}>
          23.10.2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="v1.0.1 Ensimmäiset päivitykset">
        <Text c="dimmed">
          Tämä dokumentaatio, linkit Slack-kanaville, viestien
          Slack-muotoiluiden tukemista täällä nettikäyttiksen puolella
          parannettu (boldaus yms, linkit, käyttäjien tägääminen). Ryhmien
          (kuten @channel tai @timpat) ja bottien (@Laari) maininnat kesken.
        </Text>
        <Text size="xs" mt={4}>
          14.10.2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="v1.0.0 Ensimmäinen julkaisuversio">
        <Text c="dimmed">
          Ideoiden kerääminen Slack-kanavilta, listaaminen
          web-käyttöliittymässä, vapaasanahaku, sorttaus
          kanavien/päivämäärän/tykkäysten mukaan, statuksen muuttaminen ja
          alustavat käyttöohjeet.
        </Text>
        <Text size="xs" mt={4}>
          14.10.2024
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
