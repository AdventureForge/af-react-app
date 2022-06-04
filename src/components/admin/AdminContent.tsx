import { useMemo } from 'react';
import { Column } from 'react-table';
import { AdminPageContentEnum } from '../../pages/Admin';
import { BaseEntity, PageInfo } from '../../types/domain';
import PublisherForm from '../forms/PublisherForm';
import RolePlayingGameForm from '../forms/RolePlayingGameForm';
import Section from '../layout/Section';
import Table from '../table/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

type AdminContentProps = {
  title: string;
  pageInfo?: PageInfo;
  pageType: AdminPageContentEnum;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onRowSelect: (row: (string | undefined)[]) => void;
  onDelete: () => void;
  onCreate: <T extends BaseEntity>(t: T) => void;
  onUpdate: <T extends BaseEntity>(t: T) => void;
  modalDisplayed: boolean;
  isDataReturned: boolean;
  dataFromDB: object[];
  headers: Column<object>[];
};

const AdminContent: React.FC<AdminContentProps> = (props) => {
  const data = useMemo(() => [...props.dataFromDB], [props.dataFromDB]);
  const columns: Column<object>[] = useMemo(() => props.headers, []);

  const getForm = () => {
    switch (props.pageType) {
      case AdminPageContentEnum.PUBLISHERS:
        return (
          <PublisherForm
            onConfirm={props.onCreate}
            onCancel={props.onCloseModal}
          />
        );
      case AdminPageContentEnum.ROLEPLAYINGGAMES:
        return (
          <RolePlayingGameForm
            onConfirm={props.onCreate}
            onCancel={props.onCloseModal}
          />
        );
      default:
        break;
    }
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
          value={`new ${props.title}`}
          className="w-64"
          onClick={props.onOpenModal}
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
        />
      )}
    </Section>
  );
};

export default AdminContent;
