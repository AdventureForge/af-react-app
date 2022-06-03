import { useMemo } from 'react';
import { Column } from 'react-table';
import { AdminPageContent } from '../../pages/Admin';
import { PageInfo } from '../../types/domain';
import Section from '../layout/Section';
import Table from '../table/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

type AdminContentProps = {
  pageContent: AdminPageContent;
  pageInfo: PageInfo;
  onOpenModal: () => void;
  onCloseModal: () => void;
  modalDisplayed: boolean;
  form: React.ReactNode;
  isDataReturned: boolean;
  dataFromDB: object[];
  headers: Column<object>[];
};

const AdminContent: React.FC<AdminContentProps> = (props) => {
  const data = useMemo(() => [...props.dataFromDB], []);
  const columns: Column<object>[] = useMemo(() => props.headers, []);

  return (
    <Section className="col-span-4 py-6 px-10 mb-14">
      <div className="flex flxex-row items-center justify-between">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-cyan-400" />
          <h1 className="text-white text-3xl font-semibold block pl-5">
            {props.pageContent.value} ({props.pageInfo.totalElements})
          </h1>
        </div>
        <Button
          value={`new ${props.pageContent.value.toLowerCase()}`}
          className="w-64"
          onClick={props.onOpenModal}
          style="plain"
          color="accent"
        />
      </div>
      {props.modalDisplayed && (
        <Modal onClose={props.onCloseModal}>{props.form}</Modal>
      )}
      {!props.isDataReturned && (
        <p className="text-center mt-20 text-xl italic">
          No {props.pageContent.value.toLowerCase()} found!{' '}
        </p>
      )}
      {props.isDataReturned && props.dataFromDB.length > 0 && (
        <Table data={data} columns={columns} pageInfo={props.pageInfo} />
      )}
    </Section>
  );
};

export default AdminContent;
