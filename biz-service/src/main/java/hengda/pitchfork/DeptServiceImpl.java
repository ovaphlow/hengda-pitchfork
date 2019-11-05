package hengda.pitchfork;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class DeptServiceImpl extends DeptGrpc.DeptImplBase {
    private static final Logger logger = LoggerFactory.getLogger(DeptServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void list(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "select *, " +
                    "(select count(*) from public.common_data where master_id = cd.id) as qty " +
                    "from public.common_data as cd " +
                    "where category = '车间' " +
                    "order by id desc";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getList(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "insert into public.common_data " +
                    "(master_id, category, k, v, remark) " +
                    "values (0, '车间', '', ?, ?) " +
                    "returning id";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, body.get("v").toString());
            ps.setString(2, body.get("remark").toString());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select * from public.common_data where id = ? limit 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void listSub(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select * from public.common_data where master_id = ? order by id desc";
            PreparedStatement ps = conn.prepareStatement(sql);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getList(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void saveSub(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "insert into public.common_data " +
                    "(master_id, category, k, v, remark) " +
                    "values (?, '部门', '', ?, ?) " +
                    "returning id";
            PreparedStatement ps = conn.prepareStatement(sql);
            Double master_id = Double.parseDouble(body.get("master_id").toString());
            ps.setInt(1, master_id.intValue());
            ps.setString(2, body.get("v").toString());
            ps.setString(3, body.get("remark").toString());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "update public.common_data " +
                    "set v = ? , remark = ? " +
                    "where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setString(1, body.get("v").toString());
            ps.setString(2, body.get("remark").toString());
            ps.setInt(3, id.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}