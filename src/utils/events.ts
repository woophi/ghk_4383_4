declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string) => void;
  }
}

type Payload = {
  benefit: string;
  insight: string;
  tools: string;
  personal: string;
  premium: string;
  id: number;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbwVbxYEoiIDDtTRNBQOMVAU5Vz-eZLXYeb_pXLAEoX2iThwUkZaQpgc65Na_QkFrWg/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, ...payload, variant: 'forms' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
