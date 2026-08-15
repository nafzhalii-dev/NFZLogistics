/**
 * Canonical branches/offices list — previously defined only inside
 * Locations.tsx (the most complete version already existed there).
 * Contact.tsx duplicated the head office's address at a lower level of
 * detail (missing the postal code); it now references branches[0] here
 * instead of its own copy — see final report for this conflict.
 *
 * Content (names, addresses, phone/email, hours) is carried over unchanged
 * — no branches were added, removed, or reworded.
 */
export interface Branch {
  /** i18n key for the branch type label ("loc.hq" | "loc.office" | "loc.warehouse"). */
  typeKey: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  email: string;
  hoursAr: string;
  hoursEn: string;
  isHQ: boolean;
}

export const branches: Branch[] = [
  {
    typeKey: "loc.hq",
    nameAr: "المقر الرئيسي - الرياض",
    nameEn: "Head Office - Riyadh",
    addressAr: "طريق الملك فهد، حي العليا، الرياض 12211",
    addressEn: "King Fahad Road, Al Olaya District, Riyadh 12211",
    phone: "+966 50 123 4567",
    email: "riyadh@nfzlogistics.sa",
    hoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
    hoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    isHQ: true,
  },
  {
    typeKey: "loc.office",
    nameAr: "مكتب جدة",
    nameEn: "Jeddah Office",
    addressAr: "طريق الملك عبدالعزيز، حي الروضة، جدة 23523",
    addressEn: "King Abdulaziz Road, Al Rawdah District, Jeddah 23523",
    phone: "+966 12 345 6789",
    email: "jeddah@nfzlogistics.sa",
    hoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
    hoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    isHQ: false,
  },
  {
    typeKey: "loc.office",
    nameAr: "مكتب الدمام",
    nameEn: "Dammam Office",
    addressAr: "طريق الملك فيصل، حي الشاطئ، الدمام 32241",
    addressEn: "King Faisal Road, Al Shati District, Dammam 32241",
    phone: "+966 13 456 7890",
    email: "dammam@nfzlogistics.sa",
    hoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
    hoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    isHQ: false,
  },
  {
    typeKey: "loc.warehouse",
    nameAr: "مستودع الرياض المركزي",
    nameEn: "Riyadh Central Warehouse",
    addressAr: "المنطقة الصناعية الثانية، الرياض",
    addressEn: "Second Industrial Area, Riyadh",
    phone: "+966 50 234 5678",
    email: "warehouse.riyadh@nfzlogistics.sa",
    hoursAr: "على مدار الأسبوع: ٧:٠٠ ص – ١٠:٠٠ م",
    hoursEn: "7 Days: 7:00 AM – 10:00 PM",
    isHQ: false,
  },
];
