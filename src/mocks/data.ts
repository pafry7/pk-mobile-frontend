import { number, string } from "yup";

export const buildings = {
  data: {
    buildings: [
      {
        name: "budynek SPNJO ul. Warszawska",
        id: "cef2b17e-7617-4e18-9078-e4489f115164",
      },
      {
        name: 'budynek "Działownia" ul. Warszawska',
        id: "0e727264-9d09-44c4-8226-b425990c30dc",
      },
      {
        name: "budynek Houston, ul. Warszawska, Katedra Teleinformatyki",
        id: "1f628f45-f88c-47a6-b8e3-b411a18e005c",
      },
      {
        name: "budynek przy ul. Podchorążych",
        id: "8c43f5ed-6fb0-4689-820b-acc29a2b3297",
      },
      {
        name: "budynek Wydziału Architektury ul. Warszawska",
        id: "a96b57c0-f35e-4f09-81cd-c55fc8925759",
      },
      {
        name:
          "budynek Wydziału Inżynierii i Technologii Chemicznej ul. Warszawska, Katedra Informatyki",
        id: "df2e267f-740e-43ec-a9fc-e06c66fae450",
      },
    ],
  },
};

export const types = {
  data: {
    types: [
      {
        name: "Wykład",
        id: "ababbe33-46f6-4f67-ad5b-f27c0d784fe6",
      },
      {
        name: "Warsztat",
        id: "58887675-ed2f-4c70-8ecd-ced20e8701a3",
      },
      {
        name: "Targi",
        id: "4177da57-b031-4710-9971-47f20be36952",
      },
      {
        name: "Impreza",
        id: "41582523-1c1c-4f31-aafe-b538642e9dd9",
      },
      {
        name: "Spotkanie",
        id: "d2465ed3-dbf2-4a6c-b8a6-9be1aea962f3",
      },
    ],
  },
};

export interface Event {
  name: string;
  student: {
    photo_uri: string;
    name: string;
    role: string;
  };
  building: {
    name: string;
    latitude: number;
    longitude: number;
  };
  id: string;
  end_date: string;
  start_date: string;
  description: string;
  place: string | null;
  latitude: number | null;
  longitude: number | null;
  events_types: {
    type: {
      name: string;
      id: string;
    };
  }[];
  photo_uri: string;
}

export const events: Event[] = [
  {
    name: "Warsztaty Javascript",
    student: {
      photo_uri: null,
      name: "Samorząd PK",
      role: "university",
    },
    building: null,
    id: "7830eadb-0b87-49bb-be5e-c5a50c6af756",
    end_date: "2021-01-09",
    start_date: "2021-01-09",
    description: "test",
    place: "Kawiarnia",
    latitude: 19,
    longitude: 20,
    events_types: [
      {
        type: {
          name: "Impreza",
          id: "41582523-1c1c-4f31-aafe-b538642e9dd9",
        },
      },
    ],
    photo_uri:
      "https://res.cloudinary.com/dyikas7j8/image/upload/v1610193662/mbqjtlo2d9dywlty30bk.jpg",
  },
  {
    name: "Targi pracy 2021",
    student: {
      photo_uri: null,
      name: "Samorząd PK",
      role: "university",
    },
    building: null,
    id: "22a1adb-2287-49bb-be5e-c2250c6af756",
    end_date: "2021-01-11",
    start_date: "2021-01-11",
    description: "Targi pracy są super.",
    place: "Działownia",
    latitude: 50,
    longitude: 22,
    events_types: [
      {
        type: {
          name: "Impreza",
          id: "41582523-1c1c-4f31-aafe-b538642e9dd9",
        },
      },
    ],
    photo_uri:
      "https://res.cloudinary.com/dyikas7j8/image/upload/v1610193662/mbqjtlo2d9dywlty30bk.jpg",
  },
  {
    name: "Second",
    student: {
      photo_uri: null,
      name: "Test",
      role: "user",
    },
    building: {
      name: "budynek SPNJO ul. Warszawska",
      latitude: 50,
      longitude: 19,
    },
    id: "559c8b85-5138-4e2f-8139-7e9e4900c13e",
    end_date: "2021-01-09",
    start_date: "2021-01-09",
    description: "Jaka",
    place: null,
    latitude: null,
    longitude: null,
    events_types: [
      {
        type: {
          name: "Impreza",
          id: "41582523-1c1c-4f31-aafe-b538642e9dd9",
        },
      },
    ],
    photo_uri:
      "https://res.cloudinary.com/dyikas7j8/image/upload/v1610193662/mbqjtlo2d9dywlty30bk.jpg",
  },
  {
    name: "Final",
    student: {
      photo_uri: null,
      name: "Test",
      role: "user",
    },
    building: {
      name: "budynek SPNJO ul. Warszawska",
      latitude: 50,
      longitude: 19,
    },
    id: "bc168403-1064-4291-879c-654bf92d0b66",
    end_date: "2021-01-09",
    start_date: "2021-01-09",
    description: "Hahahah",
    place: null,
    latitude: null,
    longitude: null,
    events_types: [
      {
        type: {
          name: "Impreza",
          id: "41582523-1c1c-4f31-aafe-b538642e9dd9",
        },
      },
    ],
    photo_uri:
      "https://res.cloudinary.com/dyikas7j8/image/upload/v1610192496/ejydwtwanpgjqsrahcad.jpg",
  },
  {
    name: "Testing",
    student: {
      photo_uri: null,
      name: "Test",
      role: "user",
    },
    building: {
      name: 'budynek "Działownia" ul. Warszawska',
      latitude: 50,
      longitude: 19,
    },
    id: "89b81622-d76d-4642-9466-f4983b8c62ff",
    end_date: "2021-01-09",
    start_date: "2021-01-09",
    description: "Haha",
    place: null,
    latitude: null,
    longitude: null,
    events_types: [
      {
        type: {
          name: "Impreza",
          id: "41582523-1c1c-4f31-aafe-b538642e9dd9",
        },
      },
    ],
    photo_uri:
      "https://res.cloudinary.com/dyikas7j8/image/upload/v1610193772/fmvmeuheahnuvmayo8sp.jpg",
  },
  {
    name: "JesvZse raz ",
    student: {
      photo_uri: null,
      name: "Test",
      role: "user",
    },
    building: {
      name: "budynek Houston, ul. Warszawska, Katedra Teleinformatyki",
      latitude: 50,
      longitude: 19,
    },
    id: "9e0dba1f-c1c6-48f3-8be0-5ec581bcf9ff",
    end_date: "2021-01-09",
    start_date: "2021-01-09",
    description: "Jaja",
    place: null,
    latitude: null,
    longitude: null,
    events_types: [
      {
        type: {
          name: "Targi",
          id: "4177da57-b031-4710-9971-47f20be36952",
        },
      },
    ],
    photo_uri:
      "https://res.cloudinary.com/dyikas7j8/image/upload/v1610193662/mbqjtlo2d9dywlty30bk.jpg",
  },
];
interface Activity {
  additional_info: string;
  duration: number;
  end_date: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  place: string;
  start_date: string;
  type_fk: "CLASS" | "EVENT" | "PERSONAL";
}

export const activities: Activity[] = [
  {
    additional_info:
      "Type:wykład Teacher:prof. dr hab. inż. P. Malecki Room:s. F201",
    end_date: "2021-01-14T14:45:00.000Z",
    id: "ebcdb710-b5fc-4b97-a23f-839391dc48e9",
    latitude: 19,
    longitude: 19,
    name: "Podstawy Elektroniki i Techniki Cyfrowej",
    duration: 90,
    place: "budynek przy ul. Podchorążych",
    start_date: "2021-01-14T13:15:00.000Z",
    type_fk: "CLASS",
  },
  {
    additional_info: "Type:null Teacher:null Room:null",
    end_date: "2021-01-14T18:15:00.000Z",
    duration: 105,
    id: "901c571b-2cba-4b04-a374-23b177bffba6",
    latitude: null,
    longitude: null,
    name: "Wychowanie fizyczne (Kobiety)",
    place: null,
    start_date: "2021-01-14T16:30:00.000Z",
    type_fk: "CLASS",
  },
];
