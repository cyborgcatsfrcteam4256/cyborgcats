import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ImpactEntry {
  documentation_id: string;
  team_number: string | null;
  activity_description: string;
  activity_location: string | null;
  activity_date: string;
  impact_category: string;
  documentation_type: string;
  documentation_url: string | null;
  notes: string | null;
}

export const exportToExcel = async (entries: ImpactEntry[]) => {
  try {
    // Create CSV content (Excel can open CSV files)
    const headers = [
      'Team Number or Type of Activity & Location',
      'Date of Activity',
      'Choose One Official FIRST Impact Award Definition',
      'Type of Documentation',
      'Documentation ID'
    ];

    const rows = entries.map(entry => {
      const teamAndActivity = entry.team_number 
        ? `${entry.team_number} ${entry.activity_description}${entry.activity_location ? ' & ' + entry.activity_location : ''}`
        : entry.activity_description;
      
      return [
        teamAndActivity,
        entry.activity_date,
        entry.impact_category,
        entry.documentation_type,
        entry.documentation_id
      ];
    });

    // Create CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const year = new Date().getFullYear();
    saveAs(blob, `FIRST_Impact_Award_Documentation_${year}.csv`);

    return { success: true };
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, error };
  }
};
