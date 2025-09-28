interface Step {
    id: number;
    title: string;
    completed?: boolean;
}

export const steps: Step[] = [
    { id: 1, title: 'Fahrzeug' },
    { id: 2, title: 'Termin' },
    { id: 3, title: 'Fahrzeug' },
    { id: 4, title: 'Kontakt' }
];
