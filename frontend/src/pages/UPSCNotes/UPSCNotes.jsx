import React, { useState } from 'react';
import { Sparkles, BookOpen, FileText } from 'lucide-react';
import PreparationTrackLayout from '../../components/PreparationTrackLayout';
import StudyMaterial from './StudyMaterial';
import PYQHub from './PYQHub';

const UPSCNotes = () => {
  const [activeTab, setActiveTab] = useState('study-material');

  const tabs = [
    { id: 'study-material', name: 'Archive Resources', icon: BookOpen },
    { id: 'pyq', name: 'PYQ Archives', icon: FileText },
  ];

  return (
    <PreparationTrackLayout
      title="UPSC Notes"
      subtitle="Archive."
      description="A specialized repository for high-yield study materials and historical exam archives curated for consistent learning."
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >

      {activeTab === 'study-material' && <StudyMaterial />}
      {activeTab === 'pyq' && <PYQHub />}
    </PreparationTrackLayout>
  );
};

export default UPSCNotes;
