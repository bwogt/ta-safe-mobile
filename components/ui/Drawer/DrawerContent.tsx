import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Divider from '../Divider';
import DrawerLogoutButton from './DrawerLogoutButton';
import DrawerProfileCard from './DrawerProfileCard';

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfileCard />
      <Divider />
      <DrawerItemList {...props} />
      <DrawerLogoutButton />
    </DrawerContentScrollView>
  );
}
