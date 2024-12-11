import { Member } from "../types/member";

const COLORS = [
    '#52BEBD',
    '#5474B7',
    '#7069AE',
    '#AD689E',
    '#DE5764',
    '#DD9356',
];

const FIELDS: [string, keyof Member][] = [
    ['Nome', 'name'],
    ['Sala', 'room'],
    ['Projeto', 'project'],
    ['Gênero', 'gender'],
    ['Graduação', 'graduation_level'],
    ['Atuação', 'area'],
    ['Entrou LSD', 'lsd_year'],
    ['Entrou na UFCG', 'ufcg_year']
]

export { COLORS, FIELDS };