'use client';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import Container from '../container';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiDiamonds,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../category-box';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

type CategoriesProps = {};

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmill',
    icon: GiWindmill,
    description: 'This property has windmill!!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has pool',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to lake',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in castle!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property near arctic',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property near cave',
  },
  {
    label: 'Dessert',
    icon: GiCactus,
    description: 'This property on dessert',
  },
  {
    label: 'Barn',
    icon: GiBarn,
    description: 'This property on barn',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className=' pt-4 flex flex-row items-center justify-between overflow-x-auto '>
        {categories.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            selected={category === cat.label}
            icon={cat.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
