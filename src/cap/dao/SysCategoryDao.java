package cap.dao;

import java.util.List;

import cap.bean.SysCategory;

public interface SysCategoryDao {

	/*
	 * ��ѯ����ϵͳ����
	 */
	public abstract List<SysCategory> getAllSysCategory();

	public abstract SysCategory getById(int id);

	/**
	 * ɾ��ϵͳ����
	 */
	public abstract int deleteSysCategory(int scgId);

	/**
	 * ����name����ѯ�����¼
	 */
	public abstract SysCategory getByName(String scgName);

	/**
	 * ����һ�������¼
	 */
	public abstract int insertSysCategory(String scgName);

	/**
	 * ����ϵͳ������
	 */
	public abstract int updateSysCategory(int scgId, String scgName);

	/*
	 * ��ҳ
	 */
	public abstract List<SysCategory> getSysCategoryByPage(int curPage, int size);

	/*
	 * ������������
	 */
	public abstract int count();

}