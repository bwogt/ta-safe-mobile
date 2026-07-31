import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import Divider from '../Divider';
import DrawerLogout from './_logout';
import DrawerProfileCard from './_profile';

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfileCard />
      <Divider />
      <DrawerItemList {...props} />
      <DrawerLogout />
    </DrawerContentScrollView>
  );
}
