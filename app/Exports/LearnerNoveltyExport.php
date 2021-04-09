<?php

namespace App\Exports;

use App\LearnerNovelty;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class LearnerNoveltyExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return LearnerNovelty::with('learner.group.formationProgram', 'committee', 'noveltyType')->get();
    }

    public function map($learnerNovelty): array
    {
        return [
            $learnerNovelty->committee->date,
            $learnerNovelty->committee->record_number,
            $learnerNovelty->learner->document,
            $learnerNovelty->learner->name,
            $learnerNovelty->learner->group->code_tab,
            $learnerNovelty->learner->group->formationProgram->name,
            $learnerNovelty->noveltyType->name,
            $learnerNovelty->justification
        ];
    }

    public function headings(): array
    {
        return [
            'Fecha Comité',
            'Número acta',
            'Documento',
            'Aprendiz',
            'Ficha grupo',
            'Programa formación',
            'Novedad',
            'Justificación'
        ];
    }
}
