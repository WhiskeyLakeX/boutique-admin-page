export interface IManipulationModal {
  type: string;
  onOk?: () => void;
  isOpen: boolean;
  cancel: () => void;
  selectedRecord?: any;
  refetch: () => void;
}
