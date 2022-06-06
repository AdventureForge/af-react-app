import { useMemo, useState } from 'react';
import { Column } from 'react-table';
import { UserPageContentEnum } from '../../pages/UserSpace';
import { BaseEntity, PageInfo } from '../../types/domain';
import Section from '../layout/Section';
import Table from '../table/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export enum ModalMode {
  CREATE,
  UPDATE,
}

type UserContentProps = {
  title: string;
  pageInfo?: PageInfo;
  pageType: UserPageContentEnum;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onRowSelect: (row: (string | undefined)[]) => void;
  onDelete: () => void;
  onCreate: <T extends BaseEntity>(t: T) => void;
  onUpdate: <T extends BaseEntity>(t: T) => void;
  onPageNumberChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  modalDisplayed: boolean;
  isDataReturned: boolean;
  dataFromDB: object[];
  headers: Column<object>[];
};

const UserPageContent: React.FC<UserContentProps> = (props) => {
  const data = useMemo(() => [...props.dataFromDB], [props.dataFromDB]);
  const columns: Column<object>[] = useMemo(() => props.headers, []);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [dataToUpdate, setDataToUpdate] = useState<object>();

  const getForm = () => {
    switch (props.pageType) {
      case UserPageContentEnum.CAMPAIGNS:
        return <p>Campaign page content</p>;
      case UserPageContentEnum.ADVENTURES:
        return <p>Adventures page content</p>;

      default:
        props.onCloseModal();
        break;
    }
  };

  const openModalCreateHandler = () => {
    setModalMode(ModalMode.CREATE);
    props.onOpenModal();
  };

  const openModalUpdateHandler = (updatedData: object) => {
    setModalMode(ModalMode.UPDATE);
    setDataToUpdate(updatedData);
    props.onOpenModal();
  };

  return (
    <Section className="col-span-5 py-6 px-10 mb-14">
      <div className="flex flxex-row items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-3xl font-semibold pl-5 inline-block border-l-[40px] border-l-cyan-500">
            {props.title}{' '}
            <span className="text-xl">({props.pageInfo?.totalElements})</span>
          </h1>
        </div>
        <Button
          id="btnCreate"
          value={`new ${props.title}`}
          className="w-64"
          onClick={openModalCreateHandler}
          style="plain"
          color="accent"
        />
      </div>
      {props.modalDisplayed && (
        <Modal onClose={props.onCloseModal}>{getForm()}</Modal>
      )}
      {!props.isDataReturned && (
        <p className="text-center mt-20 text-xl italic">
          No {props.title} found!{' '}
        </p>
      )}
      {props.isDataReturned && props.dataFromDB.length > 0 && (
        <Table
          data={data}
          columns={columns}
          pageInfo={props.pageInfo}
          onRowSelect={props.onRowSelect}
          onDelete={props.onDelete}
          onEdit={openModalUpdateHandler}
          onPageNumberChange={props.onPageNumberChange}
          onPageSizeChange={props.onPageSizeChange}
        />
      )}
    </Section>
  );
};

export default UserPageContent;
