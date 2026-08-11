export type GroupIconKey =
  | 'tap'
  | 'pipe'
  | 'shower'
  | 'basin'
  | 'tank'
  | 'mirror'
  | 'hook'
  | 'shelf'
  | 'towel'
  | 'soap'
  | 'tools'
  | 'electric'
  | 'jali'
  | 'seat'
  | 'paper'
  | 'tumbler'
  | 'gauge'
  | 'part'
  | 'grabbar'
  | 'more';

export interface ProductGroup {
  label: string;
  icon: GroupIconKey;
}

// The 66 distinct GROUP values from the live catalogue, with display labels
// (Title Case, a couple of obvious sheet typos corrected for the public
// site) and an icon chosen for each — many groups share an icon since
// dozens of them are close variants of the same kind of fitting.
export const PRODUCT_GROUPS: ProductGroup[] = [
  { label: '2 In 1 Angle Cock', icon: 'tap' },
  { label: '2 In 1 Bib Cock', icon: 'tap' },
  { label: 'Angle Valve', icon: 'tap' },
  { label: 'Ball Cock', icon: 'tap' },
  { label: 'Ball Valve', icon: 'tap' },
  { label: 'Basin And Urinal Parts', icon: 'basin' },
  { label: 'Basin Mixer', icon: 'tap' },
  { label: 'Bathroom Set', icon: 'shower' },
  { label: 'Bib Cock', icon: 'tap' },
  { label: 'Bottle Trap', icon: 'part' },
  { label: 'Check Valve', icon: 'tap' },
  { label: 'Cistern', icon: 'tank' },
  { label: 'Cistern Fitting', icon: 'tank' },
  { label: 'Clamp', icon: 'part' },
  { label: 'Coat Hook', icon: 'hook' },
  { label: 'Concealed Cock', icon: 'tap' },
  { label: 'Connection Pipe', icon: 'pipe' },
  { label: 'Corner Shelf', icon: 'shelf' },
  { label: 'Coupling', icon: 'part' },
  { label: 'CP Fitting Parts', icon: 'part' },
  { label: 'CP Tube', icon: 'pipe' },
  { label: 'Electric Items', icon: 'electric' },
  { label: 'Flanges', icon: 'part' },
  { label: 'Garden Tools', icon: 'tools' },
  { label: 'Gate Valve', icon: 'tap' },
  { label: 'Grab Bar', icon: 'grabbar' },
  { label: 'HF Head', icon: 'shower' },
  { label: 'Hook HF And Shower', icon: 'shower' },
  { label: 'Jali', icon: 'jali' },
  { label: 'Long Bend', icon: 'pipe' },
  { label: 'Long Body', icon: 'pipe' },
  { label: 'Mirror', icon: 'mirror' },
  { label: 'Miscellaneous Items', icon: 'more' },
  { label: 'Nipple', icon: 'part' },
  { label: 'Nozzle', icon: 'part' },
  { label: 'Paper Holder', icon: 'paper' },
  { label: 'Pillar Cock', icon: 'tap' },
  { label: 'Plastic Tap', icon: 'tap' },
  { label: 'Push Cock', icon: 'tap' },
  { label: 'RO And Tee', icon: 'part' },
  { label: 'Seal Tape', icon: 'part' },
  { label: 'Seat Cover', icon: 'seat' },
  { label: 'Seat Cover Parts', icon: 'seat' },
  { label: 'Shower', icon: 'shower' },
  { label: 'Shower Arm', icon: 'shower' },
  { label: 'Sink', icon: 'basin' },
  { label: 'Sink Cock', icon: 'tap' },
  { label: 'Sink Mixer', icon: 'tap' },
  { label: 'Soap Dish', icon: 'soap' },
  { label: 'Soap Dispenser', icon: 'soap' },
  { label: 'Spindle', icon: 'part' },
  { label: 'Spout Diverter', icon: 'part' },
  { label: 'Swan Neck', icon: 'tap' },
  { label: 'Tank Nipple', icon: 'tank' },
  { label: 'Tap Fittings', icon: 'tap' },
  { label: 'Tools', icon: 'tools' },
  { label: 'Towel Rack', icon: 'towel' },
  { label: 'Towel Ring', icon: 'towel' },
  { label: 'Towel Rod', icon: 'towel' },
  { label: 'Tumbler Holder', icon: 'tumbler' },
  { label: 'Wall Mixer', icon: 'tap' },
  { label: 'Wall Shelf', icon: 'shelf' },
  { label: 'Washer', icon: 'part' },
  { label: 'Washing Machine Tube', icon: 'pipe' },
  { label: 'Waste Pipe', icon: 'pipe' },
  { label: 'Water Meter', icon: 'gauge' },
];
